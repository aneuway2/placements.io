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
});
