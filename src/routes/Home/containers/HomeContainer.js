import { connect } from 'react-redux'
import { fetchDom } from '../modules/home'

import HomeView from '../components/HomeView'

const mapDispatchToProps = {
  fetchDom
}

const mapStateToProps = (state) => ({
  result : state.home.result,
  submitting: state.home.submitting
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
