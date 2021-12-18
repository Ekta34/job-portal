import React, { useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from '@ag-grid-community/react';
import {
  GridOptions,
  AllCommunityModules,
} from '@ag-grid-community/all-modules';
import { Spin, Result, Button, Typography } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { JOBS } from '../graphql/job';
import { Job } from '../types/Job';
import './jobtable.scss';
const { Title, Text } = Typography;

const columns = [
  {
    headerName: 'Title',
    field: 'title',
    minWidth: 250,
  },
  {
    headerName: 'Company',
    field: 'company',
  },
  {
    headerName: 'City',
    field: 'city',
  },
  {
    headerName: 'Country',
    field: 'country',
  },
  {
    headerName: 'Remote',
    field: 'isRemote',
  },
];

const JobReport = React.memo(function JobReport(props: {}): JSX.Element {
  const { loading, error, data, refetch } = useQuery(JOBS);
  const gridRef = useRef<GridOptions>();

  useEffect(() => {
    function handleResize() {
      gridRef?.current?.api?.sizeColumnsToFit();
    }
    window.addEventListener('resize', handleResize);
  });

  if (error) {
    return (
      <Result
        status="error"
        title="Something went wrong."
        subTitle={
          <Text type="danger">
            {error.graphQLErrors.map(({ message }, i) => (
              <span key={i}>{message}</span>
            ))}
          </Text>
        }
        extra={[
          <Button
            icon={<SyncOutlined style={{ color: 'rgb(0, 142, 255)' }} />}
            loading={loading}
            onClick={refetch}
            size="small"
            key="retry"
          >
            Retry
          </Button>,
        ]}
      />
    );
  }

  if (data?.jobs) {
    const rowData = (data.jobs || []).map((job: Job) => ({
      id: job.id,
      title: job.title,
      company: job?.company?.name,
      city: (job.cities || []).map((c) => c.name).join(', '),
      country: (job.cities || []).map((c) => c.country.name).join(', '),
      isRemote: job.remotes && job.remotes.length > 0 ? 'Yes' : 'No',
    }));

    return (
      <div className="jobContainer">
        <Title level={4} className="jobTableHeader">
          Jobs For Graphql
        </Title>
        <div
          id="myGrid"
          style={{
            height: 'calc(100vh - 100px)',
          }}
          className="ag-theme-balham jobReport"
        >
          <AgGridReact
            modules={AllCommunityModules}
            overlayNoRowsTemplate="No Records Found"
            columnDefs={columns}
            headerHeight={40}
            rowHeight={40}
            defaultColDef={{
              type: 'leftAligned',
              resizable: true,
              floatingFilter: true,
              filter: true,
              sortable: true,
              filterParams: {
                suppressAndOrCondition: true,
                buttons: ['clear'],
              },
            }}
            rowData={rowData}
            onGridReady={(grid) => (gridRef.current = grid)}
            onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="centered">
      <Spin size="large" tip="Loading ..." />
    </div>
  );
});

export default JobReport;
