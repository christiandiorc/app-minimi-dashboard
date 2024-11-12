import CircularProgress from '@mui/material/CircularProgress';

export const Loader = () => {
  return (
    <div style={{
      display: 'flex',
      position: 'absolute',
      width: '98%',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        position: 'absolute',
        border: 'solid 1px',
        height: '500px',
        zIndex: 5,
        backgroundColor: '#fff',
      }}>
        <CircularProgress />
      </div>
    </div>
  );
}