export default function (theme) {
  return {
    container: {
      display: 'grid',
      gridTeamplateRows: '12.5% 12.5% 75%',
      gridTemplateAreas: `'filters' 'filterData' 'entries'`,
      height: '100%',
      minHeight: '100%',
    },

    filters: {
      gridArea: 'filters',
    },

    filterData: {
      gridArea: 'filterData',
    },

    entries: {
      gridArea: 'entries',
    },

    fab: {
      position: 'fixed',
      bottom: theme.spacing(1),
      right: theme.spacing(1),
    },
  }
}
