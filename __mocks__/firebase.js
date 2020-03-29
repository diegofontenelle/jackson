import * as firebase from 'firebase'

const onAuthStateChanged = jest.fn()
const sendPasswordResetEmail = jest.fn(() => Promise.resolve())
const createUserWithEmailAndPassword = jest.fn((email, password) => {
  if (email === 'fail@fail.com' && password === 'fail') return Promise.reject()

  return Promise.resolve('result of createUserWithEmailAndPassword')
})
const signInWithEmailAndPassword = jest.fn((email, password) => {
  if (email === 'fail@fail.com' && password === 'fail') return Promise.reject()

  return Promise.resolve('result of signInWithEmailAndPassword')
})

jest.spyOn(firebase, 'initializeApp').mockImplementation(() => {
  return {
    auth: () => {
      return {
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
      }
    },
    firestore: () => ({
      collection: jest.fn((path) => ({
        doc: jest.fn((uid) => ({
          collection: jest.fn((p) => ({
            doc: jest.fn(() => ({
              set: jest.fn(({ title }) => {
                if (title === 'fail') return Promise.reject()

                return Promise.resolve()
              }),
            })),
            orderBy: jest.fn(() => ({
              get: jest.fn(() =>
                Promise.resolve({
                  docs: [],
                  empty: true,
                })
              ),
            })),
            where: jest.fn(() => ({
              orderBy: jest.fn(() => ({
                get: jest.fn(() =>
                  Promise.resolve({
                    docs: [],
                    empty: true,
                  })
                ),
              })),
            })),
          })),
        })),
      })),
      doc: jest.fn(() => Promise.resolve(true)),
      set: jest.fn(() => Promise.resolve(true)),
    }),
  }
})

jest.spyOn(firebase, 'auth').mockImplementation(() => {
  return {
    onAuthStateChanged,
    currentUser: {
      displayName: 'testDisplayName',
      email: 'test@test.com',
      emailVerified: true,
    },
    sendPasswordResetEmail,
  }
})

jest.spyOn(firebase, 'firestore').mockImplementation(() => ({
  collection: jest.fn(() => Promise.resolve()),
  doc: jest.fn(() => Promise.resolve(true)),
  set: jest.fn(() => Promise.resolve(true)),
}))

// const mockQueryResponse = jest.fn()
// mockQueryResponse.mockResolvedValue([
//   {
//     id: 1,
//   },
// ])

// jest.mock('firebase/auth', () => ({
//   signInWithEmailAndPassword: (email, pw) => console.log(email, pw),
// }))

// jest.mock('firebase', () => ({
//   initializeApp: jest.fn(() => ({
//     auth: () => ({
//       onAuthStateChanged: jest.fn((cb) =>
//         cb({
//           currentUser: {
//             uid: '1234',
//           },
//         })
//       ),
//       signInWithEmailAndPassword: (email, pw) => Promise.resolve(true),
//       currentUser: {
//         uid: '1234',
//       },
//     }),
//   })),
//   auth: () => ({
//     onAuthStateChanged: jest.fn(() => Promise.resolve(true)),
//     signInWithEmailAndPassword: (email, pw) => console.log(email, pw),
//     currentUser: {
//       uid: '1234',
//     },
//   }),
//   firestore: () => ({
//     collection: jest.fn((path) => ({
//       doc: jest.fn((uid) => ({
//         collection: jest.fn((p) => ({
//           doc: jest.fn((_uid) => ({
//             set: jest.fn((data) => Promise.resolve(true)),
//           })),
//         })),
//       })),
//     })),
//     doc: jest.fn(() => Promise.resolve(true)),
//     set: jest.fn(() => Promise.resolve(true)),
//   }),
// }))
