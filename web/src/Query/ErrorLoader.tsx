import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  summaryContainer: {
    backgroundColor: "#f3f2f1",
    padding: "30px 20px",
    margin: "0px",
    height: "400px",
  },
  title: {
    fontSize: "24px",
    fontWeight: 400,
  },
  message: {
    fontSize: "16px",
    fontWeight: 400,
    margin: "20px 0",
  },
});

interface ErrorProps {
  message?: string;
}

export const ErrorLoader = (error: ErrorProps) => {
  const style = useStyles();
  return (
    <div className={style.summaryContainer}>
      <div className={style.title}>An error has occurred</div>
      <div className={style.message}>
        {error?.message ||
          "An unknown issue has preveneted the server from responding. Please try again later."}
      </div>
    </div>
  );
};
