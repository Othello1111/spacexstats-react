import React from 'react';
import Section, {
  SectionContent,
  SectionDescription,
} from 'components/ui/Section';
import Ribbon, { ribbonHeight } from 'components/ui/Ribbon';
import {
  TableContainer,
  Table,
  TableHeader,
  TableHeaderRow,
  TableBody,
  TableRow,
  TableCell,
} from 'components/ui/Table';
import TimeStat from 'components/ui/TimeStat';
import { modelizer, ModelizedUpcomingLaunch } from './modelizer';
import { BlockProps } from 'types';
import styled from 'styled-components';
import { thresholds } from 'stylesheet';

const VideoWrapper = styled.div`
  width: 100%;
  @media (min-width: ${thresholds.sm}) {
    width: 60%;
  }
`;

const Upcoming: React.FC<BlockProps> = ({ data, ...rest }) => {
  const { nextLaunch, nextLaunches } = modelizer(data);

  const tabs = [
    {
      id: 'next',
      label: 'Up Next',
      background: 'falcon9block5.jpg',
      title: nextLaunch.mission,
      render: (
        <>
          <Ribbon>{nextLaunch.localDate}</Ribbon>
          <SectionContent style={{ marginTop: ribbonHeight }}>
            <TimeStat value={nextLaunch.date} type="countdown" />
          </SectionContent>
          <SectionDescription>{nextLaunch.description}</SectionDescription>
        </>
      ),
    },
    {
      id: 'next-launches',
      label: 'Next Launches',
      background: 'asds.jpg',
      title: 'Next Launches',
      render: (
        <SectionContent>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableHeaderRow>
                  <TableCell as="th" style={{ width: '40%' }}>
                    Mission
                  </TableCell>
                  <TableCell as="th" style={{ width: '26%' }}>
                    Date (UTC)
                  </TableCell>
                  <TableCell as="th" style={{ width: '17%' }}>
                    Vehicle
                  </TableCell>
                  <TableCell as="th" style={{ width: '17%' }}>
                    Launchpad
                  </TableCell>
                </TableHeaderRow>
              </TableHeader>
              <TableBody>
                {nextLaunches.map(
                  ({
                    mission,
                    date,
                    vehicle,
                    launchpad,
                  }: ModelizedUpcomingLaunch) => (
                    <TableRow key={mission}>
                      <TableCell>{mission}</TableCell>
                      <TableCell>{date}</TableCell>
                      <TableCell>{vehicle}</TableCell>
                      <TableCell>{launchpad}</TableCell>
                    </TableRow>
                  ),
                )}
                {nextLaunches.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4}>No launches to display</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </SectionContent>
      ),
    },
    {
      id: 'recent-updates',
      label: 'Recent Updates',
      background: 'starshipsn4.jpg',
      title: 'Recent Updates',
      render: (
        <SectionContent style={{ alignItems: 'center' }}>
          <VideoWrapper>
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56%',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube-nocookie.com/embed/videoseries?list=PLKH6J0WU0gbsJpSO_Awf4wb07BKikj0qr"
                  title="SpaceX recaps by Jack Lishman"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </VideoWrapper>
        </SectionContent>
      ),
    },
  ];

  return <Section title="Upcoming" tabs={tabs} {...rest} />;
};

export default Upcoming;
