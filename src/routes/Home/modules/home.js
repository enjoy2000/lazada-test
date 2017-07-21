import $ from 'jquery'

$.ajaxPrefilter((options) => {
  if (options.crossDomain && $.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url
  }
})

export const GET_SPECIFICATIONS_REQUEST = 'GET_SPECIFICATIONS_REQUEST'
export const GET_SPECIFICATIONS_SUCCESS = 'GET_SPECIFICATIONS_SUCCESS'

function fetOneUrl (url, dispatch) {
  url = url.trim()
  $.get(url, (data) => {
    let specifications = {
      url: url,
      specs: {}
    }
    specifications.title = $(data).find('h1#prod_title').text().trim()
    $.each($('table.specification-table tr', data), (index, item) => {
      const specKey = $(item).find('td').first().text().trim()
      const specValue = $(item).find('td').last().text().trim()
      specifications.specs[specKey] = specValue
    })
    dispatch({
      type: GET_SPECIFICATIONS_SUCCESS,
      payload: specifications
    })
  })
}

export function fetchDom (url1, url2) {
  return (dispatch, getState) => {
    getState().home.result = []
    dispatch({
      type: GET_SPECIFICATIONS_REQUEST,
      payload: ''
    })
    fetOneUrl(url1, dispatch)
    fetOneUrl(url2, dispatch)
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SPECIFICATIONS_REQUEST]    : (state, action) => {
    return Object.assign({}, state, {
      submitting: true
    })
  },
  [GET_SPECIFICATIONS_SUCCESS]    : (state, action) => {
    const submitting = state.result.length === 0
    return Object.assign({}, state, {
      submitting: submitting,
      result: state.result.concat(action.payload)
    })
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  submitting: false,
  result: []
}
export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
