import { useTileStyles } from "./tileStyles";
import { LineItemAdjustmentsUpdate } from "../Query/LineItemAdjustmentsUpdate.tsx";
import { Label } from "@fluentui/react";
import { Input, useId } from "@fluentui/react-components";

interface LineItemData {
  data: {
    id: number;
    booked_amount: number;
    actual_amount: number;
    adjustment: number;
    recorded_amount: number;
  }[];
}
export const LineItemDetailTile = ({ data }: { data: LineItemData }) => {
  const bookedId = useId("display-booked");
  const actualId = useId("display-actual");
  const recordedId = useId("display-recorded");
  const style = useTileStyles();
  const dataRecord = data.data[0];
  return (
    <div className={style.tile}>
      <div className={style.field}>
        <Label htmlFor={bookedId}>Booked</Label>
        <Input
          id={bookedId}
          type={"number"}
          value={dataRecord.booked_amount}
          disabled={true}
        />
      </div>
      <div className={style.field}>
        <Label htmlFor={actualId}>Actual</Label>
        <Input
          id={actualId}
          type={"number"}
          value={dataRecord.actual_amount}
          disabled={true}
        />
      </div>
      <LineItemAdjustmentsUpdate
        lineItemId={dataRecord.id}
        adjustment={dataRecord.adjustment}
      />
      <div className={style.separator}> </div>
      <div className={style.field}>
        <Label htmlFor={recordedId}>Recorded amount after adjustments</Label>
        <Input
          id={recordedId}
          type={"number"}
          value={dataRecord.recorded_amount}
          disabled={true}
        />
      </div>
    </div>
  );
};
