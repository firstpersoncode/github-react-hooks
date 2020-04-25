import React, { FunctionComponent } from 'react'
import {
    Box,
    Avatar,
    Typography,
    Card,
    CardHeader,
    CardContent,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    IconButton,
    Chip
} from '@material-ui/core'
import { ExpandMore, ChevronLeft, ChevronRight } from '@material-ui/icons'

import useStore from '~/store'
import { SET_USER_EVENTS_NEXT, SET_USER_EVENTS_PREV } from '~/store/user'

import ProgressiveImage from '../ProgressiveImage'

import useStyle from './style'

const Events: FunctionComponent = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { events, eventsPage, eventsFetch } = state.user

    const _nextEvents = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_EVENTS_NEXT, payload: user.login })
    }

    const _prevEvents = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_EVENTS_PREV, payload: user.login })
    }

    return (
        <Card className={classes.root + (eventsFetch ? ' loading' : '')}>
            <Box p={2}>
                {events && events.length
                    ? events
                          .filter((event: any) => event.public)
                          .map((event: any) => (
                              <Box key={event.id} my={2}>
                                  <Card elevation={3}>
                                      <CardHeader
                                          avatar={
                                              <ProgressiveImage
                                                  fallBack={event.actor.avatar_url}
                                                  src={event.actor.avatar_url}
                                                  render={(src: string) => <Avatar alt={user.name} src={src} />}
                                              />
                                          }
                                          title={
                                              <a href={`https://github.com/${event.repo.name}`} target="_blank">
                                                  {event.repo.name}
                                              </a>
                                          }
                                          subheader={
                                              <Box display="flex" alignItems="center" justifyContent="space-between">
                                                  <small>{new Date(event.created_at).toLocaleString()}</small>
                                                  <Chip
                                                      color="primary"
                                                      variant="outlined"
                                                      size="small"
                                                      label={<small>{event.type}</small>}
                                                  />
                                              </Box>
                                          }
                                      />
                                      <CardContent>
                                          <ExpansionPanel>
                                              <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                                                  <Typography>Payload</Typography>
                                              </ExpansionPanelSummary>
                                              <ExpansionPanelDetails>
                                                  <Box maxHeight={200} overflow="auto">
                                                      <pre>{JSON.stringify(event.payload, null, '\t')}</pre>
                                                  </Box>
                                              </ExpansionPanelDetails>
                                          </ExpansionPanel>
                                      </CardContent>
                                  </Card>
                              </Box>
                          ))
                    : null}
                <Box display="flex" justifyContent="flex-end" alignItems="center">
                    <IconButton onClick={_prevEvents}>
                        <ChevronLeft />
                    </IconButton>
                    <Typography>Page {eventsPage}</Typography>
                    <IconButton onClick={_nextEvents}>
                        <ChevronRight />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    )
}

export default Events
