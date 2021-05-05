/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Card, Box, Image, Text, CardFooter, Button,
} from 'grommet';
import {
  Favorite,
} from 'grommet-icons';

class TeamListItem extends Component {
  render() {
    const {
      imgSrc,
      idTeam,
      team,
      isFavorited,
      onFavoriteToggle,
    } = this.props;
    return (
      <Card
        justify="center"
        align="center"
        pad="small"
        border
        round
        gap="medium"
        width="medium"
      >
        <Box height="small" width="xsmall">
          <Image
            alignSelf="center"
            fit="cover"
            src={imgSrc}
          />
        </Box>
        <Text>{team}</Text>
        <CardFooter>
          <Box direction="row" align="center" gap="small">
            <Button
              icon={<Favorite color={isFavorited ? 'red' : undefined} />}
              hoverIndicator
              onClick={() => {
                onFavoriteToggle(idTeam);
              }}
            />
          </Box>
        </CardFooter>
      </Card>
    );
  }
}

export default TeamListItem;
