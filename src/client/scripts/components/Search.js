import React, { PropTypes } from 'react'
import { Link }             from 'react-router'

class Search extends React.Component {

  constructor() {

    super()

    this.state = {}
    this.stage = 0
    this.style = {}

    this.getStyle = this.getStyle.bind(this)
    this.setStyle = this.setStyle.bind(this)

    this.initStyles = this.initStyles.bind(this)
    this.stylize = this.stylize.bind(this)

    this.getResults = this.getResults.bind(this)
    this.setResults = this.setResults.bind(this)

    this.search = this.search.bind(this)

  }

  componentWillMount() {
    $(window).resize(e => {
      this.stage = 0
      this.setStyle({})
    })
  }

  componentWillUnmount() {

  }

  componentDidMount() {

    if (!this.stage) {
      this.stage = 1
      this.initStyles()
    }

  }

  componentDidUpdate() {

    if (!this.stage) {
      this.stage = 1
      this.initStyles()
    }

  }

  render() {

    const props     = this.props,
          search    = this.search,
          results   = this.getResults(),
          stylize   = this.stylize,
          open      = (results && results.length ? true : false),
          functions = props.functions

    let style = this.getStyle()

    return (
      <div className = {'search-container' + (this.stage ? '' : ' raw')}>
        <div className = 'search' style = {style}>
          <form onSubmit = {e => e.preventDefault()}>
            <div className = 'input-field'>
              <input
                id            = 'search-input'
                type          = 'search'
                onFocus       = {e => stylize('focus')}
                onBlur        = {e => stylize('blur')}
                onChange      = {e => search(e.currentTarget.value)}
                autoComplete  = {'off'}
                required
              />
              <label className = 'label-icon' htmlFor = 'search-input'>
                <i className = 'material-icons'>search</i>
              </label>
              <i className = 'material-icons'>close</i>
            </div>
          </form>
        </div>
        <ul className = {'results' + (open ? ' active' : '')}>
        {(open ? (
          Object.values(results).map(player => {
            const id = player.id

            return (
              <li key = {id}>
                <Link to = {'/player/' + id}>
                  <span>{player.first}</span>
                  <span>{player.last}</span>
                  <span>{player.position}</span>
                  <span>{player.team}</span>
                </Link>
              </li>
            )
          })
        ) : (
          null
        ))}
        </ul>
      </div>
    )
  }

  getStyle() {
    return this.state.style
  }

  setStyle(style) {
    this.setState({ style })
  }

  initStyles() {

    let styles = this.styles

    const search    = $('.search'),
          offset    = $('.search-container').offset(),
          position  = search.position()

    styles = this.styles = {
      blur: {
        position: 'fixed',
        width: search.width()
      },
      focus: {
        position: 'fixed',
        width: $(document).width(),
        transform: 'translate(' + -offset.left + 'px, ' + -offset.top + 'px)'
      }
    }

    this.setStyle(styles.blur)

  }

  stylize(mode) {

    const term      = $('#search-input').val(),
          setStyle  = () => this.setStyle(this.styles[mode])

    if (mode === 'focus') {

      $('.search').addClass('active')
      setStyle()

    } else if (!term) {

      $('.search').removeClass('active')
      setStyle()

    }


  }

  getResults() {
    return this.state.results
  }

  setResults(results) {
    this.setState({ results })
  }

  search(term) {

    if (term && term.length > 1) {

      const post = this.props.functions.post

      const success = json => this.setResults(json)

      post('/api/secure/scout/search', { term }, {
        success: {
          callback: success,
          preventNotification: true
        }
      })

    } else this.setResults([])

  }

}

Search.propTypes = {
  functions: PropTypes.object.isRequired
}

export default Search
