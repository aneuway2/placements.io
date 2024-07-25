import { makeStyles } from "@fluentui/react-components";

export const DataTableStyles = makeStyles({
  dataTable: {
    padding: "0px 10px",
  },
  table: {
    "& .fui-DataGridHeader .fui-DataGridHeaderCell:nth-child(1), & .fui-DataGridRow .fui-DataGridCell:nth-child(1)":
      {
        flex: "0.25",
      },
    "& .fui-DataGridHeader .fui-DataGridHeaderCell:nth-child(2), & .fui-DataGridRow .fui-DataGridCell:nth-child(2)":
      {
        flex: "3",
      },
  },
  negativeNumber: {
    color: "red",
  },
});
