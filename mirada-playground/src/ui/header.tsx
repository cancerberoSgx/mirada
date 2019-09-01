import { enumNoValueKeys } from 'misc-utils-of-mine-generic'
import { enumKeys } from 'misc-utils-of-mine-typescript'
import * as React from 'react'
import { Button, Dropdown, Input, Menu, Modal } from 'semantic-ui-react'
import { loadFileFromInputElement, setExample } from '../app/dispatcher'
import { ExampleTag } from "../app/examples"
import { memoryReport } from "../util/util"
import { About } from './about'
import { AbstractComponent } from './common/component'

export class Header extends AbstractComponent {

  timer: NodeJS.Timeout | undefined

  componentDidMount() {
    this.timer = setInterval(() => this.updateMem(), 1000)
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  updateMem(): void {
    if (this.memEl) {
      this.memEl.innerHTML = memoryReport().usedMb + ' ' + memoryReport().percent
    }
  }

  memEl: HTMLDivElement | null = null;

  render() {
    console.log('header')

    return <Menu inverted fixed="top" id="header">
      <Dropdown text='Examples' pointing className='link item'>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Dropdown text={`All (${this.state.examples.length})`} fluid={true} scrolling>
              <Dropdown.Menu>
                {this.state.examples.map(example => <Dropdown.Item key={example.name} fluid={true} onClick={e => setExample(example)}>{example.name}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
          </Dropdown.Item>

          <Dropdown.Divider />
          <Dropdown.Header>Categories ({enumNoValueKeys(ExampleTag).length})</Dropdown.Header>
          {enumKeys(ExampleTag).map(tag =>
            <Dropdown.Item key={tag}>
              <Dropdown text={tag} fluid>
                <Dropdown.Menu>
                  {this.state.examples.filter(e => e.tags.includes(tag as any)).map(e =>
                    <Dropdown.Item key={tag + e.name} fluid onClick={ev => setExample(e)}><Dropdown.Header>{e.name}</Dropdown.Header></Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Item className={this.state.working ? "working" : ""} >{this.state.working ? <div >WORKING</div> : 'IDLE'}</Menu.Item>

      <Menu.Item ><div ref={c => this.memEl = c}></div></Menu.Item>
      <Menu.Item > <Button onClick={e => this.setState({ toolBarCollapsed: !this.state.toolBarCollapsed })}>{!this.state.toolBarCollapsed ? 'Hide' : 'Show'} Toolbar</Button>
      </Menu.Item>

      <Input type="file" label="Load" size="small" inverted onChange={async e => loadFileFromInputElement(e.currentTarget)} />

      <Menu.Menu position="right">
        <Modal trigger={<Menu.Item as='a'>About</Menu.Item>}>
          <Modal.Header>About</Modal.Header>
          <Modal.Content>
            <About />
          </Modal.Content>
        </Modal>
      </Menu.Menu>
    </Menu>
  }
}

