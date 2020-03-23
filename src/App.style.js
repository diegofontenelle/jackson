export default function () {
  return {
    container: {
      display: 'grid',
      gridTemplateRows: '56px calc(100% - 102px) 56px',
      gridTemplateAreas: `
        'header'
        'main'
        'footer'`,
      height: '100%',
      overflowX: 'hidden',
    },

    main: {
      gridArea: 'main',
    },

    footer: {
      gridArea: 'footer',
    },
  }
}
