import * as React from 'react'
import { AbstractComponent } from '../util/component'

export class Header extends AbstractComponent {
  componentDidMount() {
    document.onkeydown = function(e) {
      if (e.keyCode == 27) {
        var mods = document.querySelectorAll('.modal > [type=checkbox]')
        ;[].forEach.call(mods, function(mod: any) {
          mod.checked = false
        })
      }
    }
  }
  render() {
    return (
      <div>
        <nav>
          <a href="#" className={`brand`}>
            <span aria-hidden="true" data-icon="&#x21dd;" />
            <span>ts-morph Playground</span>
          </a>
          {/* <select
            className="button"
            onChange={e =>
              dispatch({
                type: LAYOUT_ACTIONS.CHANGE_THEME,
                theme: state.layout.themes.find(t => t.name === e.currentTarget.value)!
              })
            }>
            {state.layout.themes.map(t => (
              <option key={t.name} value={t.name}>
                {t.name} theme
              </option>
            ))}
          </select> */}
          <label htmlFor="whats_this_modal" className="button">
            What's this?
          </label>
          {/* <Link className="button" to={'/state/' + stateToString(state)}>
            Create Url
          </Link> */}
        </nav>

        <div className="modal">
          <input id="whats_this_modal" type="checkbox" />
          <label htmlFor="whats_this_modal" className="overlay" />
          <article>
            <header>
              <h3>ts-morph playground</h3>
              <label htmlFor="whats_this_modal" className="close">
                &times;
              </label>
            </header>
            <section className="content">
              <p>
                Welcome to <a href="https://github.com/dsherret/ts-morph">ts-morph</a> playground, where you can explore
                a some of examples that use this library to parse, manipulate, print TypeScript code. You will be able
                to run and modify the examples.
              </p>

              <p>
                I've made this page just to practice my front-end skills and explore new technologies, and is not
                directly associated with ts-morph library, so use the examples at your own risk.{' '}
              </p>

              <p>
                At the left you have a list of examples, by select them their source code will be shown on the editor.
                At the right there is list of TypeScript files that the examples consume and are given in the{' '}
                <code>files</code> parameter of the <code>execute()</code> method.
              </p>

              <p>Currently the example code have some limitations when you try to edit or write new ones: </p>
              <ul>
                <li>
                  You only will be able to write code <strong>inside</strong> the <code>execute()</code>. You can
                  declare types outside the method, but all valued declarations must be inside.
                </li>
                <li>You won't be able to import anything</li>
                <li>
                  You use ts-morph library thought the <code>tsMorph</code> variable.
                </li>
              </ul>

              <p>
                Using the <button>Create Url</button> button you will be able to represent the current state of the
                example code and sample files in the URL so you can share it (with me) if you have accomplished
                something interesting or reproduce some issue.{' '}
              </p>

              <p>I hope you find this page useful, enjoy</p>
            </section>

            <footer>
              <label htmlFor="whats_this_modal" className="button warning">
                OK
              </label>
            </footer>
          </article>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state: State) => ({
//   state: state
// })

// const styles = (theme: Theme) => ({
//   nav: {
//     backgroundColor: theme.backgroundColor,
//     color: theme.foregroundColor,
//     '@global': {
//       '.brand': {
//         padding: '0 1em 0.9em 0'
//       },
//       '.modal': {
//         backgroundColor: `${theme.colorPrimary} `
//       },
//       '.brand *': {
//         color: theme.colorPrimary
//       }
//     }
//   }
// })

// export const Header = withStyles(styles)(connect(mapStateToProps)(Header_))
