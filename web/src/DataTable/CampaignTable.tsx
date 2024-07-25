import {
  TableColumnDefinition,
  createTableColumn,
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGridBody,
  DataGridCell,
} from "@fluentui/react-components";
import { Link } from "wouter";
import { DataTableStyles } from "./DataTableStyles.tsx";
import { formatCurrency } from "./formatCurrency";

export type Item = {
  id: number;
  name: string;
  booked_amount: number;
  actual_amount: number;
  adjustment: number;
  recorded_amount: number;
  campaign_id: number;
};

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "id",
    compare: (a, b) => {
      return a.id - b.id;
    },
    renderHeaderCell: () => "ID",
    renderCell: (item: Item) => item.id,
  }),
  createTableColumn<Item>({
    columnId: "name",
    compare: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    renderHeaderCell: () => "Campaign",
    renderCell: (item: Item) => {
      return <Link to={`/campaign/${item.id}`}>{item.name}</Link>;
    },
  }),
  createTableColumn<Item>({
    columnId: "booked_amount",
    compare: (a, b) => {
      return a.booked_amount - b.booked_amount;
    },
    renderHeaderCell: () => "Booked",
    renderCell: (item: Item) => {
      return (
        <span title={item.booked_amount}>
          {formatCurrency(Number(item.booked_amount.toFixed(2)))}
        </span>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "actual_amount",
    compare: (a, b) => {
      return a.actual_amount - b.actual_amount;
    },
    renderHeaderCell: () => "Actual",
    renderCell: (item: Item) => {
      return (
        <span title={item.actual_amount}>
          {formatCurrency(Number(item.actual_amount.toFixed(2)))}
        </span>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "adjustment",
    compare: (a, b) => {
      return a.adjustment - b.adjustment;
    },
    renderHeaderCell: () => "Adjustments",
    renderCell: (item: Item) => {
      const style = DataTableStyles();
      return (
        <span
          title={item.adjustment}
          className={item.adjustment < 0 ? style.negativeNumber : ""}
        >
          {formatCurrency(Number(item.adjustment.toFixed(2)))}
        </span>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "recorded_amount",
    compare: (a, b) => {
      return a.recorded_amount - b.recorded_amount;
    },
    renderHeaderCell: () => "Recorded",
    renderCell: (item: Item) => {
      const style = DataTableStyles();
      return (
        <span
          title={item.recorded_amount}
          className={item.recorded_amount < 0 ? style.negativeNumber : ""}
        >
          {formatCurrency(Number(item.recorded_amount.toFixed(2)))}
        </span>
      );
    },
  }),
];

export const CampaignTable = ({ data }: { data: Item[] }) => {
  const style = DataTableStyles();
  if (!data) return <div>No data available</div>;
  return (
    <div className={style.dataTable}>
      <DataGrid items={data} columns={columns} sortable className={style.table}>
        <DataGridHeader>
          <DataGridRow key={"grid-table-header"}>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};
