import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { LineItemTable } from "../DataTable/LineItemTable.tsx";
import { Metrics } from "../Metrics/Metrics.tsx";
import { LineItemTile } from "../Metrics/LineItemTile.tsx";
import { ObjectTitleBar } from "../ObjectTitleBar/ObjectTitleBar.tsx";
import { DocumentFolder20Filled } from "@fluentui/react-icons";

export const LineItemQuery = () => {
  const [, params] = useRoute("/campaign/:campaign_id");
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["lineItem"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8000/line_item?campaign_id=${params.campaign_id}`
      );
      const response_data = await response.json();
      return response_data;
    },
    cacheTime: 60000,
    refetchOnWindowFocus: false,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (isFetching) return "Fetching...";

  return (
    <>
      <ObjectTitleBar
        Icon={<DocumentFolder20Filled />}
        label={data.data[0].campaign_name}
        identifer={data.data[0].campaign_id}
      />
      <Metrics data={data} TileComponent={LineItemTile} />
      <LineItemTable data={data.data} />
    </>
  );
};
