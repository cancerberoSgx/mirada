// import * as React from 'react'
// import withStyles, { ThemeProvider, WithSheet } from 'react-jss'
// import { connect } from 'react-redux'
// import { HashRouter, Route, Switch } from 'react-router-dom'
// import { State } from '../store/state'
// import { Theme } from '../theme/theme'
// import { App } from './app'

// const styles = {}
// interface P extends WithSheet<typeof styles, Theme> {
//   state: State
// }
// class ThemedRoutedApp_ extends React.Component<P> {
//   render() {
//     return (
//       <ThemeProvider theme={this.props.state.layout.theme}>
//         <HashRouter hashType={'slash'}>
//           <Switch>
//             <Route path="/:params" component={App} />
//             <Route path="/" component={App} />
//             <Route component={(props: any) => <div>404 not founddddd</div>} />
//           </Switch>
//         </HashRouter>
//       </ThemeProvider>
//     )
//   }
// }
// const mapStateToProps = (state: State) => ({
//   state: state
// })
// export const ThemedRoutedApp = withStyles(styles)(connect(mapStateToProps)(ThemedRoutedApp_))
