import { Theme } from './theme'

export const commonStyles = (theme: Theme) => ({
  '@global': {
    button: {
      backgroundColor: `${theme.colorPrimary} `
    },
    '.button': {
      backgroundColor: `${theme.colorPrimary} `
    },
    textarea: {
      backgroundColor: theme.backgroundColor,
      color: theme.foregroundColor,
      padding: 0,
      border: 0
    },
    a: {
      cursor: 'pointer',
      color: `${theme.colorPrimary}`
    },
    'a:hover': {
      textDecoration: 'underline'
    },
    '.selected a': {
      textDecoration: 'underline',
      fontWeight: 'bolder'
    },
    body: {
      margin: '0',
      color: '0',
      backgroundColor: '0'
    },
    ul: {
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
      marginTop: 0
    },
    '.card, .modal .overlay ~ *': {
      backgroundColor: theme.backgroundColor
    },
    // cheap icons
    '[data-icon]:before': {
      fontFamily: 'icons',
      content: 'attr(data-icon)',
      fontSize: '2em',
      speak: 'none'
    }
  }
})
