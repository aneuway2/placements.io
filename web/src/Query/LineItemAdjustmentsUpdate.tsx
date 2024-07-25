import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input, useId } from "@fluentui/react-components";
import { Label } from "@fluentui/react";
import { useTileStyles } from "../Metrics/tileStyles.tsx";

const postLineItemData = async ({
  lineItemId,
  adjustment,
}: {
  lineItemId: number;
  adjustment: number;
}) => {
  const response = await fetch(
    `http://localhost:8000/line_item?line_item_id=${lineItemId}&adjustment=${adjustment}`,
    {
      method: "PATCH",
      headers: {
        accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const LineItemAdjustmentsUpdate = ({
  lineItemId,
  adjustment: initialAdjustment,
}: {
  lineItemId: number;
  adjustment: number;
}) => {
  const [adjustment, setAdjustment] = useState<number | "">(initialAdjustment);
  const mutation = useMutation({
    mutationFn: postLineItemData,
  });

  const handleSubmit = () => {
    console.log("lineItemId", lineItemId);
    console.log("adjustment", adjustment);
    if (adjustment !== "") {
      mutation.mutate(
        { lineItemId, adjustment: Number(adjustment) },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("lineItemDetail");
          },
        }
      );
    }
  };
  const queryClient = useQueryClient();
  const inputId = useId("line-item-adjustment");
  const style = useTileStyles();
  return (
    <>
      <div className={style.field}>
        <Label htmlFor={inputId}>Adjustment</Label>
        <Input
          id={inputId}
          type={"number"}
          value={adjustment}
          onChange={(e) => setAdjustment(e.target.value)}
        />
      </div>
      <div className={style.field}>
        <Button type={"submit"} appearance={"primary"} onClick={handleSubmit}>
          Update
        </Button>
      </div>
      <div className={style.field}>
        <div className={style.statusMessage}>
          {mutation.status === "loading" && "Processing..."}
          {mutation.status === "error" &&
            `An error occurred: ${mutation.error.message}`}
        </div>
      </div>
    </>
  );
};
