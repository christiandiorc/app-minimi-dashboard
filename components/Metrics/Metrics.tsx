import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import styles from './Metrics.module.css';

// Define the type for the props to ensure they are all strings
interface MetricsProps {
  metric1: string | number;
  metric2: string | number;
  metric3: string | number;
  metric4: string | number;
  totalRecords?: string | number;
  isLoading?: boolean;
}

export const Metrics: React.FC<MetricsProps> = ({
  metric1,
  metric2,
  metric3,
  metric4,
  totalRecords,
  isLoading,
}) => {
  const [isClient, setIsClient] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState<number>(0); // Time elapsed in seconds
  const [timeDisplay, setTimeDisplay] = React.useState<string>('Just now');

  const renderMetric = (label: string, value: string | number, Icon: React.ElementType) => (
    <div className={styles.metricComponent}>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 'normal',
          color: '#666',
          fontSize: {
            xs: '12px',  // Smallest font size for mobile devices
            sm: '16px',  // Slightly larger for small devices
            md: '18px',  // Medium devices
            lg: '20px',  // Larger screens (tablets, laptops)
            xl: '22px',  // Even larger for large screens
          },
          fontFamily: '"Bahnschrift Light", sans-serif',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {label}
        <Icon className={styles.metricIcon}/>
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          fontSize: {
            xs: '24px',  // Smaller font size on mobile devices
            sm: '28px',  // Slightly larger for small devices
            md: '24px',  // Medium devices
            lg: '36px',  // Larger screens (tablets, laptops)
            xl: '40px',  // Larger screens (desktops)
          },
          fontFamily: '"Bahnschrift Light", sans-serif',
          marginTop: '8px',
        }}
      >
        {/* {value} */}
        {isLoading ? <Skeleton variant="rectangular" width={'100%'} height={45} sx={{marginTop: '8px'}} /> : value}
      </Typography>
    </div>
  );

  React.useEffect(() => {
    setIsClient(true);
    setTimeElapsed(0);
  }, []);

  React.useEffect(() => {
    // Start the timer as soon as the component mounts
    const timerInterval = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1); // Increment time by 1 second
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []);

  React.useEffect(() => {
    // Format the timeDisplay based on the elapsed time
    let displayText = '';

    if (timeElapsed < 60) {
      displayText = 'Just now';
    } else if (timeElapsed < 120) {
      displayText = '1m ago';
    } else if (timeElapsed < 3600) {
      const minutes = Math.floor(timeElapsed / 60);
      displayText = `${minutes}m ago`;
    } else if (timeElapsed < 7200) {
      displayText = '1h ago';
    } else {
      const hours = Math.floor(timeElapsed / 3600);
      displayText = `${hours}h ago`;
    }

    setTimeDisplay(displayText); // Update the display text

  }, [timeElapsed]);

  return (
    <React.Fragment>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          fontSize: '36px',
          fontFamily: '"Bahnschrift Light", sans-serif',
          marginTop: '8px',
        }}
      >
        Dashboard Metrics
      </Typography>
      {isClient && (
        <div className={styles.metricsContainer}>
          {/* Metric 1 */}
          {renderMetric('Metric 1', metric1.toLocaleString() || `${(Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000).toLocaleString()}`, BarChartIcon)}

          {/* Metric 2 */}
          {renderMetric('Metric 2', metric2 || (Math.random() * (10 - 1) + 1).toFixed(2), CandlestickChartIcon)}

          {/* Metric 3 */}
          {renderMetric('Metric 3', `${metric3}%` || `${Math.floor(Math.random() * 100) + 1}%`, PieChartIcon)}

          {/* Metric 4 */}
          {renderMetric('Metric 4', `$${metric4}` || `$${parseFloat((Math.random() * (10000000 - 10000) + 10000).toFixed(2)).toLocaleString()}`, ShowChartIcon)}

          {/* Total Records */}
          <div className={styles.metricComponent}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'normal',
                color: '#666',
                fontSize: '18px',
                fontFamily: '"Bahnschrift Light", sans-serif',
              }}
            >
              Total Records
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#333',
                fontSize: {
                  xs: '24px',  // Smaller font size on mobile devices
                  sm: '28px',  // Slightly larger for small devices
                  md: '24px',  // Medium devices
                  lg: '36px',  // Larger screens (tablets, laptops)
                  xl: '40px',  // Larger screens (desktops)
                },
                fontFamily: '"Bahnschrift Light", sans-serif',
                marginTop: '8px',
              }}
            >
              {isLoading ? <Skeleton variant="rectangular" width={'100%'} height={45} sx={{marginTop: '8px'}} /> : totalRecords}
            </Typography>
          </div>

          {/* Last Updated */}
          <div className={styles.metricComponent}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'normal',
                color: '#666',
                fontSize: '18px',
                fontFamily: '"Bahnschrift Light", sans-serif',
              }}
            >
              Last Updated
            </Typography>
            <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  fontSize: {
                    xs: '24px',  // Smaller font size on mobile devices
                    sm: '28px',  // Slightly larger for small devices
                    md: '24px',  // Medium devices
                    lg: '36px',  // Larger screens (tablets, laptops)
                    xl: '40px',  // Larger screens (desktops)
                  },
                  fontFamily: '"Bahnschrift Light", sans-serif',
                  marginTop: '8px',
                }}
              >
              {isLoading ? <Skeleton variant="rectangular" width={'100%'} height={45} sx={{marginTop: '8px'}} /> : timeDisplay}
            </Typography>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

