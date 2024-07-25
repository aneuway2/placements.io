import { makeStyles } from "@fluentui/react-components";
import React from "react";
import { Tag } from "@fluentui/react-components";
import { NumberSymbolFilled } from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    width: "100%",
    backgroundColor: "#f3f2f1",
    padding: "10px 20px",
    margin: "0px",
    fontSize: "24px",
    fontWeight: 400,
    display: "flex",
    alignItems: "center",
    "& > svg": {
      marginRight: "10px",
    },
    "& .fui-Tag": {
      marginLeft: "20px",
      marginBottom: "-4px",
      "& svg": {
        fontSize: "12px",
      },
    },
  },
});

export const ObjectTitleBar = ({
  Icon,
  label,
  identifer = null,
}: {
  Icon: React.ReactNode;
  label: string;
  identifer?: number;
}) => {
  const style = useStyles();
  return (
    <div className={style.container}>
      {Icon}
      {label}
      {identifer && (
        <Tag
          appearance={"outline"}
          size={"small"}
          icon={<NumberSymbolFilled />}
        >
          {identifer}
        </Tag>
      )}
    </div>
  );
};
