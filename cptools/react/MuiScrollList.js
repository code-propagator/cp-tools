import React, {Component} from 'react'

import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-flexbox-grid'

// 'react-infinite-grid' --> ERROR
// 'react-list' --> ERROR
// https://github.com/tnrich/react-variable-height-infinite-scroller
import InfiniteScroller from 'react-variable-height-infinite-scroller'

const AVERAGE_ELEMENT_HEIGHT = 56
const CONTAINER_HEIGHT = AVERAGE_ELEMENT_HEIGHT * 5

class MuiScrollList extends Component {
  constructor (props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
    // next line number to display
    const jump = {row: 0}

    this.state = {
      rowToJumpTo: null,
      newRowToJumpTo: jump,
      averageElementHeight: typeof this.props.averageElementHeight === 'undefined'
        ? AVERAGE_ELEMENT_HEIGHT : this.props.averageElementHeight,
      containerHeight: typeof this.props.containerHeight === 'undefined'
        ? CONTAINER_HEIGHT : this.props.containerHeight,
      fetchData: this.props.fetchData, // function to fetch data
      renderRow: this.props.renderRow, // function to reander row
      showRefreshButton: this.props.showRefreshButton,
      onClickRow: this.props.onClickRow
    }

    this.jumpToTop = this.jumpToTop.bind(this)
    this.jumpToEnd = this.jumpToEnd.bind(this)

    this.refreshData = this.refreshData.bind(this)

    this.onClickRow = this.onClickRow.bind(this)
  }

  componentDidMount () {
    // call function to fetch new data
    // this.state.fetchData()
  }

  jumpToTop () {
    if (!this.props.dataArr) return
    if (!this.props.dataArr.length) return
    const len = this.props.dataArr.length
    if (len < 1) return
    console.log('jumpToTop')
    // line number to jump to
    const newjump = {row: 0}
    // data index for jump to
    const newrow = {row: 0}

    this.setState({
      rowToJumpTo: newjump,
      newRowToJumpTo: newrow
    })
  }

  jumpToEnd () {
    if (!this.props.dataArr) return
    if (!this.props.dataArr.length) return
    const len = this.props.dataArr.length
    if (len < 1) return

    console.log('HEIGHT',
      this.state.averageElementHeight,
      len,
      this.state.averageElementHeight * len,
      this.state.containerHeight)

    if (this.state.averageElementHeight * len < this.state.containerHeight) {
      console.log('SMALL NUMVER OF ITEMS')
      return
    }

    const end = len - 1
    console.log('jumpToEnd', end)
    // line number to jump to
    const newjump = {row: end}
    // data index to jump to
    const newrow = {row: end}

    this.setState({
      rowToJumpTo: newjump,
      newRowToJumpTo: newrow
    })
  }

  refreshData () {
    this.state.fetchData()
    this.jumpToTop()
  }

  render () {
    var count = 0
    if (this.props.dataArr === undefined) {
      count = 0
    } else {
      count = this.props.dataArr.length
    }

    const averageElementHeight = typeof this.state.averageElementHeight === 'undefined'
      ? AVERAGE_ELEMENT_HEIGHT : this.state.averageElementHeight

    const containerHeight = typeof this.state.containerHeight === 'undefined'
      ? CONTAINER_HEIGHT : this.state.containerHeight

    if (
      typeof this.props.hideHeader !== 'undefined' &&
      this.props.hideHeader === true
    ) {
      return (
        <div>
          <div style={{width: '100%', height: '4px'}} />
          <div overflow='scroll'>
            {
              count > 0
              ? <InfiniteScroller
                averageElementHeight={averageElementHeight} // this is a guess you make!
                containerHeight={containerHeight}
                rowToJumpTo={this.state.rowToJumpTo} // (optional) set this if you want to start/jump to a a particular row. Must be passed as a new object each time to allow for difference checking
                renderRow={this.renderRow} // function to render a row
                totalNumberOfRows={count} // an array of data for your rows
              />
              : <div />
            }
          </div>
        </div>
      )
    } else {
      const COUNT = '件数'
      const HEAD = '先頭'
      const TAIL = '末尾'
      const REFRESH = '最新'

      return (
        <div>
          <Grid fluid>
            <Row middle='xs'>
              <Col xs>{COUNT}:{count}</Col>
              <Col xs>
                <RaisedButton label={HEAD} onClick={this.jumpToTop} />
                <RaisedButton label={TAIL} onClick={this.jumpToEnd} />
                {
                  (typeof this.state.showRefreshButton !== 'undefined' &&
                  this.state.showRefreshButton === true)
                  ? <RaisedButton label={REFRESH} onClick={this.refreshData} />
                  : <div />
                }
              </Col>
            </Row>
          </Grid>
          <div style={{width: '100%', height: '4px'}} />
          <div overflow='scroll'>
            {
              count > 0
              ? <InfiniteScroller
                averageElementHeight={averageElementHeight} // this is a guess you make!
                containerHeight={containerHeight}
                rowToJumpTo={this.state.rowToJumpTo} // (optional) set this if you want to start/jump to a a particular row. Must be passed as a new object each time to allow for difference checking
                renderRow={this.renderRow} // function to render a row
                totalNumberOfRows={count} // an array of data for your rows
              />
              : <div />
            }
          </div>
        </div>
      )
    }
  }

  renderRow (rowNumber) {
    const heightOfRow = this.props.dataArr[rowNumber].height
    /*
    var disp = "";
    var obj = this.props.dataArr[rowNumber];
    if ((!!obj) && (obj != null)) {
        if ((!!(obj.info.name)) && (obj.info.name != null)) {
            disp = obj.info.name;
        }
    }

    let color = rowNumber % 4 === 0 ? 'red' : 'blue';
    */
    let disp = this.state.renderRow(rowNumber)
    /*
    <div>
        [{rowNumber}](H:{heightOfRow}):{disp}<br/>
        <div style={{
            width: "200px",
            height: "7px",
            background: color
        }}></div>
    </div>
    */

    return (
      <div key={rowNumber}
        style={{
          height: heightOfRow,
          margin: '1px'
        }}>
        <Paper className={{
          margin: 20,
          textAlign: 'left',
          wordWrap: 'break-word',
          display: 'inline-block'
        }} zDepth={1}>
          <MenuItem onClick={(e) => {
            console.log('item click', e)
            this.onClickRow(e)
          }}>{disp}</MenuItem>
        </Paper>
      </div>
    )
  }

  onClickRow (evt) {
    this.state.onClickRow(evt)
  }
}

module.exports = MuiScrollList
