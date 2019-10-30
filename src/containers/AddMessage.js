import { connect } from 'react-redux'
import AddMessageComponent from '../components/AddMessage'
import { addMessage } from '../actions'

// const mapStateToProps = (state) => ({
//   status: state.status
// })

const mapDispatchToProps = dispatch => ({
  dispatch: (message, author,status) => {
    dispatch(addMessage(message, author,status))
  }
})

export const AddMessage = connect(() => ({}), mapDispatchToProps)(AddMessageComponent)