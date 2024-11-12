'use client';

import React from 'react';
import { ColDef, ColGroupDef, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { CircularProgress, Paper } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import moment from 'moment';
import {
  Button, 
  Footer, 
  Header, 
  Metrics, 
  Prompt,
  SearchBox,
  Toast,
  ToastProps,
  ToastAlertSeverity,
  ButtonIconPlacementEnum,
} from '@/components';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styles from './page.module.css';

type RowData = {
  id: number;
  name: string;
  uploadDateTime: string;
  country: string;
  contractCode: string;
};

interface PaginationSetting {
  page: number;
  limit: number;
};

const initialColumnData: (ColDef<any> | ColGroupDef<any>)[] | null = [
  { 
    headerName: ' ', 
    field: 'action', 
    width: 60, 
    minWidth: 60,
    checkboxSelection: true, 
    headerCheckboxSelection: true, 
  },
  { headerName: 'Company Name', field: 'name', flex: 1, filter: true, resizable: true },
  { headerName: 'Country', field: 'country', flex: 1, filter: true, hide: true, resizable: true  },
  { headerName: 'Contract Code', field: 'contractCode', flex: 1, filter: true, hide: true, resizable: true  },
  {
    headerName: 'Upload Date',
    field: 'uploadDateTime',
    filter: 'agDateColumnFilter',
    flex: 1,
    hide: true,
    resizable: true, 
    filterParams: {
      // Set default date comparator (optional)
      comparator: (filterLocalDateAtMidnight: any, cellValue: string) => {
        const cellDate = new Date(cellValue);
        if (cellDate < filterLocalDateAtMidnight) {
          return -1; // cellDate is before the filter date
        }
        if (cellDate > filterLocalDateAtMidnight) {
          return 1; // cellDate is after the filter date
        }
        return 0; // cellDate is the same as the filter date
      }
    },
    valueFormatter: (params) => {
      return `${moment(params.value).format('L')} ${moment(params.value).format('HH:mm:ss')}`;
    }
  },
];

const Home: React.FC = () => {

  const gridRef = React.useRef(null);

  const [cachedDataBeforeFilter, setCachedDataBeforeFilter] = React.useState<RowData[] | null>([]);
  const [columnDefs, setColumnDefs] = React.useState<(ColDef<any> | ColGroupDef<any>)[]>(initialColumnData);
  const [isDeleteButtonEnabled, setIsDeleteButtonEnabled] = React.useState<boolean>(false);
  const [rowData, setRowData] = React.useState<RowData[] | null>([]);
  const [selectedRows, setSelectedRows] = React.useState<Array<any>>([]);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showHiddenColumns, setShowHiddenColumns] = React.useState<boolean>(false);
  const [toastSettings, setToastSettings] = React.useState<ToastProps>({
    open: false,
    message: 'Default toast message',
    severity: ToastAlertSeverity.Info,
  });
  const [wildcardSearchQueryString, setWildcardSearchQueryString] = React.useState<string>('');

  // API Loading Flags
  const [isDeleteCompanyAPILoading, setIsDeleteCompanyAPILoading] = React.useState<boolean>(false);
  const [isGetCompaniesAPILoading, setIsGetCompaniesAPILoading] = React.useState<boolean>(false);
  const isLoading = React.useMemo(() => {
    return isGetCompaniesAPILoading || isDeleteCompanyAPILoading;
  }, [isGetCompaniesAPILoading, isDeleteCompanyAPILoading]) 

  // Metric Values: For Visuals only
  const [metric1, setMetric1] = React.useState(Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000);
  const [metric2, setMetric2] = React.useState((Math.random() * (10 - 1) + 1).toFixed(2));
  const [metric3, setMetric3] = React.useState(Math.floor(Math.random() * 100) + 1);
  const [metric4, setMetric4] = React.useState(parseFloat((Math.random() * (10000000 - 10000) + 10000).toFixed(2)).toLocaleString());

  // Auto Sort Function
  const sortColumnByDefault = (event:  GridReadyEvent<RowData, any>, field: string, sortDir: string) => {
    const columnState: any = {
      state: [{ colId: field, sort: sortDir }],
    };
    event.api.applyColumnState(columnState);
  };

  // Delete Action Button
  const handleDeleteAction = () => {
    if (selectedRows.length) setShowDeleteModal(true);
  };

  const handleConfirmDeleteAction = React.useCallback(async () => {
    setIsDeleteCompanyAPILoading(true);
    const getSelectedRowIds = (rowNodes: RowData[]): number[] => {
      return rowNodes.map((rowNode) => rowNode.id); 
    };

    try {
      const response = await fetch('/api/companies', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: getSelectedRowIds(selectedRows) }), // Send selectedIds in the request body
      });

      const data = await response.json();

      if (response.ok) {
        setIsDeleteCompanyAPILoading(false);
        setToastSettings({
          open: true,
          message: data.message,
          severity: ToastAlertSeverity.Success,
        });
        setRowData(data.data);
      } else {
        setIsDeleteCompanyAPILoading(false);
        setToastSettings({
          open: true,
          message: 'An error has occured while trying to delete records. Please try again.',
          severity: ToastAlertSeverity.Error,
        });
      }
    } catch (error) {
      setIsDeleteCompanyAPILoading(false);
      console.error('Error deleting companies:', error);
      setToastSettings({
        open: true,
        message: 'An error has occured while trying to delete records. Please try again.',
        severity: ToastAlertSeverity.Error,
      });
    }
    handleCloseModal();
  }, [selectedRows])

  // Close Modal Action
  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseToast = () => {
    setToastSettings({
      open: false,
    });
  };

  const fetchCompanies = React.useCallback(async () => {
    setIsGetCompaniesAPILoading(true);
    try {
      const response = await fetch(`/api/companies`);
      if (response.ok) {
        const data = await response.json();
        setIsGetCompaniesAPILoading(false);
        setRowData(data);
      } else {
        setIsGetCompaniesAPILoading(false);
        console.error('Failed to fetch companies');
      }
    } catch (error) {
      setIsGetCompaniesAPILoading(false);
      console.error('Error fetching data:', error);
    }
  }, []);

  // Wildcard Search Filter Function
  const handleWildcardSearchFilter: (searchQuery: string) => void = React.useCallback((searchQuery) => {
    if (searchQuery !== wildcardSearchQueryString) {
      console.log('filtering....');
      setWildcardSearchQueryString(searchQuery);
      // Escape special characters in the search query except the '*' wildcard
      // Escape special characters in the search query except the '*' wildcard
      const escapedQuery = searchQuery
        .replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&')  // Escape all special regex characters
        .replace(/\*/g, '.*');  // Replace '*' with '.*' (regex pattern for any characters)

      // Create a regular expression from the search query without starting and ending anchors
      const regex = new RegExp(escapedQuery, 'i');  // 'i' for case-insensitive search
    
      // Cache data before filtering the dataset
      if (cachedDataBeforeFilter && !cachedDataBeforeFilter.length) setCachedDataBeforeFilter(rowData);

      // Filter the rowData array based on the regex match in company name
      const filteredRowData: any = rowData?.filter((row) => regex.test(row.name));
      setRowData(filteredRowData);
    };
  }, [rowData, cachedDataBeforeFilter]);

  const handleOnWildcardSearchCleared = () => {
     setWildcardSearchQueryString(''); // reset the wildcard query string value
     setRowData(cachedDataBeforeFilter); // return the cached data back to the grid
    //  setCachedDataBeforeFilter([]); // reset the cached data
  };

  const handleShowErrorFeedback = () => {
    setToastSettings({
      open: true,
      message: 'This feature is still in progress',
      severity: ToastAlertSeverity.Error,
    })
  };

  // Metrics Ad-Hoc Component with dependency on `rowData` and `isLoading` states
  const RenderMetricsComponent = React.useCallback(() => {
    return (
      <Metrics 
        metric1={metric1}
        metric2={metric2}
        metric3={metric3}
        metric4={metric4}
        totalRecords={rowData?.length}
        isLoading={isLoading}
      />
    )
  }, [rowData, isLoading]);

  // Memoizing the grid options to avoid unnecessary re-renders
  const gridOptions = React.useMemo(() => ({
    columnDefs,
    defaultColDef: { resizable: false },
    loading: isLoading,
    loadingOverlayComponent: () => (
      <span>
        <CircularProgress />
      </span>
    ),
    onGridReady: (params: GridReadyEvent<any, any>) => (sortColumnByDefault(params, 'uploadDateTime', 'asc')),
    onSelectionChanged: (params: SelectionChangedEvent<any, any>) => {
      const selectedRows = params.api.getSelectedRows();
      setSelectedRows(selectedRows);
      setIsDeleteButtonEnabled(selectedRows.length > 0);
    },
    pagination: true,
    paginationPageSizeSelector: [20, 50, 100, 250, 500, 1000],
    rowSelection: 'multiple' as 'multiple', // Explicitly type this as 'multiple'
  }), [
    columnDefs,
    isLoading,
    rowData,
    gridRef,
    sortColumnByDefault,
    setSelectedRows,
    setIsDeleteButtonEnabled,
  ]);

  React.useEffect(() => {
    // GET ALL Companies from API
    fetchCompanies();
  }, []);

  return (
    <div style={{height: '100vh'}}>
      <Header />
      <div className={styles.page}>
        <main className={styles.main}>
          {/* Dashboard Metrics */}
          {RenderMetricsComponent()}

          {/* Main Content */}
          <div style={{marginTop: '36px', marginBottom: '8px'}}>
            {/* DataGrid Header/Filter Component */}
            <div style={{marginBottom: '8px', marginTop: '8px'}}>
              <div className={styles.gridHeaderContainer}>
                {/* Action Buttons */}
                <div style={{display: 'flex', flex: 1, justifyContent: 'flex-start'}}>
                  <span>
                    <Button
                      label='Delete' 
                      Icon={DeleteIcon} 
                      disabled={!isDeleteButtonEnabled}
                      onClick={handleDeleteAction}
                    />
                  </span>
                  <span style={{marginLeft: '4px'}}>
                    <Button
                      label='Add New' 
                      Icon={AddCircleIcon} 
                      onClick={handleShowErrorFeedback}
                    />
                  </span>
                </div>
                {/* Search Filter */}
                <div style={{display: 'flex', flex: 2, justifyContent: 'center'}}>
                  <span style={{width: '100%'}}>
                    <SearchBox
                      label='Wildcard Search Filter'
                      placeholder="Search for company name/s thru keyword: '*tech' would match 'Biotech' 'Fintech', 'Edtech'"
                      onSearch={handleWildcardSearchFilter}
                      onChange={(event) => {
                        if (!event.target.value.length) {
                          handleOnWildcardSearchCleared();
                        }
                      }}
                      onSearchCleared={handleOnWildcardSearchCleared}
                    />
                  </span>
                  <span>
                    <Button
                      label={showHiddenColumns ? 'Hide Extra Columns' : 'Show Extra Columns'}
                      Icon={showHiddenColumns ? VisibilityOffIcon : VisibilityIcon} 
                      onClick={() => {
                        const displayedHidenColumns = [...columnDefs].map((column: any) => {
                          if (column.field === 'name' || column.field === 'action') return column;
                          return {
                            ...column,
                            hide: !column.hide,
                          }
                        });
                        setShowHiddenColumns(prev => (!prev));
                        setColumnDefs(displayedHidenColumns);
                      }}
                      style={{marginLeft: '4px'}}
                    />
                  </span>
                </div>
              </div>
            </div>

            {/* DataGrid Component */}
            <Paper elevation={3}>
              <div className='ag-theme-alpine' style={{ height: '520px', width: '100%' }}>
                <AgGridReact
                  {...gridOptions}
                  rowData={rowData}
                  ref={gridRef} // Passing rowData and ref explicitly as they might be external to the memoization
                />
              </div>
            </Paper>
          </div>

          {/* DataGrid Sub Row */}
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {/* Row Selected Indicator */}
            <span style={{
              fontSize: '14px',
              color: '#333',
              marginTop: 8,
            }}>
              {selectedRows.length} row/s selected
            </span>
            {/* Export Button */}
            <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
              <span style={{marginLeft: '4px'}}>
                <Button
                  label='Export Records' 
                  Icon={FileDownloadIcon} 
                  onClick={handleShowErrorFeedback}
                  iconPlacement={ButtonIconPlacementEnum.Left}
                />
              </span>
            </div>
          </div>
        </main>
      </div>
      <Toast
        open={toastSettings.open}
        message={toastSettings.message}
        severity={toastSettings.severity}
        onClose={handleCloseToast}
      />
      <Prompt
        open={showDeleteModal}
        header='Confirm Deletion'
        subHeader='Selected record/s will be permanently deleted from the system. Do you wish to continue?'
        onClose={handleCloseModal}
        onProceed={handleConfirmDeleteAction}
        disabled={isLoading}
      />
      {/* Page Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;