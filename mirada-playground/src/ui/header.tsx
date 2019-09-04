import * as React from 'react'
import { Button, Dropdown, Icon, Input, Menu, Modal, Popup } from 'semantic-ui-react'
import { loadFileFromInputElement, handleFileSave } from '../app/dispatcher'
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
    return <Menu inverted fixed="top" id="header">

      <Dropdown text='Files' pointing simple className='link item'>
        <Dropdown.Menu>
          <Dropdown.Item >
            <Input type="file" label="Load with OpenCV" size="small" onChange={async e => loadFileFromInputElement(e.currentTarget)} />
            <Popup content="Load files using OpenCV.js `cv.imread()` which uses the DOM. Supports JPEG and PNG image formats." trigger={<Icon name="help circle" size="large" />} />
          </Dropdown.Item>
          <Dropdown.Item >
            <Input type="file" label="Load with ImageMagick" size="small" onChange={async e => loadFileFromInputElement(e.currentTarget, true)} />
            <Popup content="Load files with npmjs.com/magica a project of mine that ports ImageMagic and several of its image format delegate libraries to support read and write a lots of formats like: GIF, TIFF, WEBP, RAW, PSD, JP2, JPK, EXR, HDR, JNG, PCX, TGA, XCF, XPM, MAT, CRW, and more." trigger={
              <Icon name="help circle" size="large" />} />
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown text='Save' pointing className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item>
                <div style={{ maxWidth: '40vw', whiteSpace: 'normal' }}>
                  {`PDF, GIF, JPG, PNG, TIFF, WEBP, RAW, PSD, JP2, JPK, EXR, HDR, JNG, PCX, TGA, XCF, XPM, MAT, CRW`
                    .replace(/\s+/g, '').toLowerCase().split(',').map(format => 
                      <Button size="tiny"  onClick={e=>handleFileSave(format)} content={format} style={{ width: '60px' }} />
                    )}
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Menu position="right">
        <Menu.Item ><div ref={c => this.memEl = c}></div></Menu.Item>
        <Menu.Item > <Button onClick={e => this.setState({ toolBarCollapsed: !this.state.toolBarCollapsed })}>{!this.state.toolBarCollapsed ? 'Hide' : 'Show'} Toolbar</Button>
        </Menu.Item>
        <Menu.Item className={this.state.working ? "working" : ""} >{this.state.working ? <div>WORKING</div> : 'IDLE'}</Menu.Item>
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

