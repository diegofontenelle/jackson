export default function (theme) {
  return {
    container: {
      display: 'grid',
      gridTemplateRows: '100px 20% 70%',
      gridTemplateAreas: `'filters' 'filterData' 'entries'`,
      height: '100%',
      minHeight: '100%',
    },

    filters: {
      gridArea: 'filters',
    },

    entries: {
      gridArea: 'entries',
      margin: `${theme.spacing(2)}px 0`,
    },

    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }
}
