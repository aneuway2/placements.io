import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Metrics } from "../Metrics/Metrics.tsx";
import { LineItemDetailTile } from "../Metrics/LineItemDetailTile.tsx";
import { ObjectTitleBar } from "../ObjectTitleBar/ObjectTitleBar.tsx";
import { DocumentFolder20Filled, Album20Filled } from "@fluentui/react-icons";

export const LineItemDetailQuery = () => {
  const [, params] = useRoute("/campaign/:campaign_id/line-item/:line_item_id");
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["lineItemDetail"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8000/line_item?campaign_id=${params?.campaign_id}&line_item_id=${params?.line_item_id}`
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
      <ObjectTitleBar
        Icon={<Album20Filled />}
        label={data.data[0].name}
        identifer={data.data[0].id}
      />
      <Metrics data={data} TileComponent={LineItemDetailTile} />
    </>
  );
};
