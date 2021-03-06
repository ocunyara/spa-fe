import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
// MUI Stuff
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'

import styles from './ScreamDialog.module.scss'

import Comments from '../Post/Comments/Comments'
import LikeButton from '../Post/LikeButton/LikeButton'
import CommentForm from '../CommentForm/CommentForm'

import { connect } from 'react-redux'
import { getScream, clearErrors } from '../../redux/actions/dataActions'

class ScreamDialog extends Component {
  state = {
    open: false,
  }
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen()
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
    this.props.getScream(this.props.screamId)
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.clearErrors()
  }

  render() {
    const {
      scream: { screamId, body, createAt, likeCount, commentCount, userImage, userHandle, comments },
      UI: { loading },
    } = this.props

    const dialogMarkup = loading ? (
      <div className={styles.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container>
        <Grid item sm={2}>
          <img src={userImage} alt="Profile" className={styles.profileImage} />
        </Grid>
        <Grid item sm={10} className={styles.content}>
          <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
            @{userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <ChatIcon color="primary" />
          <span>{commentCount} comments</span>
          <CommentForm screamId={screamId} />
          <Comments comments={comments} />
        </Grid>
      </Grid>
    )

    return (
      <Fragment>
        <ChatBubbleOutlineIcon className={styles.comment} onClick={this.handleOpen} />
        <Dialog open={this.state.open} fullWidth maxWidth="sm">
          <CloseIcon className={styles.close} onClick={this.handleClose} />
          <DialogContent>{dialogMarkup}</DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI,
})

const mapActionsToProps = {
  getScream,
  clearErrors,
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(ScreamDialog)
