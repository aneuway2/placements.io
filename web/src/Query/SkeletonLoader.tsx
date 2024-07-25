import { makeStyles, Skeleton, SkeletonItem } from "@fluentui/react-components";

const useStyles = makeStyles({
  summaryContainer: {
    backgroundColor: "#f3f2f1",
    padding: "10px 20px",
    margin: "0px",
    display: "flex",
    gap: "20px",
  },
  graphContainer: {
    flex: "1 1 67%",
  },
  tileContainer: {
    flex: "1 1 33%",
  },
  tile: {
    height: "400px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  tableRow: {
    height: "50px",
    margin: "10px",
    padding: "0px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

export const SkeletonLoader = () => {
  const style = useStyles();
  return (
    <>
      <div className={style.summaryContainer}>
        <div className={style.tileContainer}>
          <Skeleton>
            <SkeletonItem className={style.tile}>Loading...</SkeletonItem>
          </Skeleton>
        </div>
        <div className={style.graphContainer}>
          <Skeleton>
            <SkeletonItem className={style.tile}>Loading...</SkeletonItem>
          </Skeleton>
        </div>
      </div>
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton key={index}>
          <SkeletonItem className={style.tableRow}>Loading...</SkeletonItem>
        </Skeleton>
      ))}
    </>
  );
};
