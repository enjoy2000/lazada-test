import React from 'react'
import './HomeView.scss'
import PropTypes from 'prop-types'
import SpecsTable from './SpecsTable'

export default class HomeView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      url1: '',
      url2: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit (e) {
    e.preventDefault()

    this.props.fetchDom(this.state.url1, this.state.url2)
  }

  static propTypes = {
    result: PropTypes.array.isRequired,
    fetchDom: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render () {
    return (
      <div>
        <div id='validate'>
          <form onSubmit={this.onSubmit} role='form' className='form'>
            <div className='form-group row'>
              <div className='col-md-9'>
                <input name='url1' onChange={this.onChange} className='form-control'
                  required type='url' value={this.state.url1} placeholder='Url 1' />
                <input name='url2' onChange={this.onChange} className='form-control'
                  required type='url' value={this.state.url2} placeholder='Url 2' />
              </div>
              <div className='col-md-3'>
                <button type='submit' className={`btn btn-primary${this.props.submitting ? ' disabled' : ''}`}>
                  Submit
                </button>
              </div>
            </div>
          </form>
          <hr />
          <div className={`${this.props.submitting ? '' : 'hidden'}`}>
            <div className='lds-css ng-scope'>
              <div className='lds-rolling'>
                <div>&nbsp;</div>
              </div>
            </div>
          </div>
          <div id='result'>
            <SpecsTable result={this.props.result} />
          </div>
        </div>
      </div>
    )
  }
}
