import { makeStyles } from "@fluentui/react-components";

export const useTileStyles = makeStyles({
  tile: {
    flex: "1 1 33%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  metricTitle: {
    textAlign: "center",
    fontSize: "48px",
    marginTop: "-64px", // for vertical alignment
    marginBottom: "52px", // text height + margin
  },
  metricHeroCount: {
    textAlign: "center",
    fontSize: "94px",
    fontWeight: "bold",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    width: "100%",
    maxWidth: "400px",
    "& button": {
      marginTop: "16px",
    },
  },
  statusMessage: {
    height: "20px",
    marginTop: "20px",
    textAlign: "center",
  },
  separator: {
    height: "1px",
    width: "450px",
    backgroundColor: "#605f5f",
  },
});
