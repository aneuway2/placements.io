import sqlite3
import json
import datetime
import calendar
from fastapi import FastAPI, Query, Depends, HTTPException, Request
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="Placements.io",
    summary="Sample Application API",
    description="A sample application to demonstrate the technical abilities of Andrew Bowman",
    contact={
        "name": "Andrew Bowman",
        "url": "https://www.linkedin.com/in/gabow/",
    },
    docs_url="/",
)


def database(query: str, mapping: dict = None) -> list[dict]:
    print(query)
    connection = sqlite3.connect("/database/database.db")
    cursor = connection.cursor()
    cursor.execute(query, mapping or {})
    data = []
    if cursor.description:
        column_names = [_[0] for _ in cursor.description]
        data = [dict(zip(column_names, _)) for _ in cursor.fetchall()]
    connection.commit()
    connection.close()
    return data


def database_mappings(criteria: list[dict]) -> tuple[dict, str]:
    """
    Manages the collection of WHERE statements and mapping values for the database query
    """
    mappings = {}
    conditionals = ["1=1"]

    def add_filter(name: str, value: any):
        """
        Generates the data for the mapping/conditional
        """
        reference = name.replace(".", "_")
        if value and isinstance(value, (str, list, dict)):
            # Source: https://ricardoanderegg.com/posts/sqlite-list-array-parameter-query/
            # Benefit of this approach over a "".join() is that it's more secure and keeps us
            # from needing to handle the mapping tuples
            conditionals.append(
                f"{name} IN (SELECT value from json_each(:{reference}))"
            )
            mappings[reference] = json.dumps(value)

    for criterion in criteria:
        add_filter(criterion["name"], criterion["value"])
    return mappings, " AND ".join(conditionals)


def get_summary(data_source):
    return {
        "booked_amount": sum(item["booked_amount"] for item in data_source),
        "actual_amount": sum(item["actual_amount"] for item in data_source),
        "adjustment": sum(item["adjustment"] for item in data_source),
        "recorded_amount": sum(
            item["booked_amount"] + item["adjustment"] for item in data_source
        ),
    }


class ReportingData(BaseModel):
    booked_amount: float
    actual_amount: float
    adjustment: float
    recorded_amount: float


class CampaignData(ReportingData):
    id: int
    name: str


class CampaignModel(BaseModel):
    data: Optional[List[CampaignData]] = []
    count: int
    summary: Optional[ReportingData] = {}


class LineItemData(BaseModel):
    id: int
    name: str
    campaign_id: int
    campaign_name: str
    booked_amount: float
    actual_amount: float
    adjustment: float
    recorded_amount: float


class LineItemModel(BaseModel):
    data: List[LineItemData]
    count: int
    summary: Optional[ReportingData] = {}


class InvoiceData(LineItemData):
    recorded_amount: float
    start_date: datetime.date
    end_date: datetime.date
    invoice_date: datetime.date


class InvoiceModel(BaseModel):
    data: List[InvoiceData]
    count: int
    summary: Optional[ReportingData] = {}


@app.get("/campaign", tags=["campaign"])
async def get_campaign(campaign_id: List[int] = Query(None)) -> CampaignModel:
    """
    Get campaign orders by `campaign_id`. If a `campaign_id` is not provided, all campaigns will be returned.
    """
    mappings, conditionals = database_mappings(
        [{"name": "campaign.id", "value": campaign_id}]
    )
    data = database(
        f"""
        SELECT
            campaign.id, 
            campaign.name, 
            SUM(line_item.actual_amount) as "booked_amount",
            SUM(line_item.booked_amount) as "actual_amount",
            SUM(line_item.adjustment) as "adjustment",
            SUM(line_item.actual_amount + line_item.adjustment) as "recorded_amount"
        FROM campaign
        JOIN line_item ON campaign.id = line_item.campaign_id
        WHERE {conditionals}
        GROUP BY campaign.id
    """,
        mappings,
    )
    return CampaignModel(
        data=data or [],
        summary=get_summary(data),
        count=len(data),
    )


@app.get("/line_item", tags=["line_item"])
async def get_line_item(
    campaign_id: List[int] = Query(None), line_item_id: List[int] = Query(None)
) -> LineItemModel:
    """
    Get line item by `line_item_id`. If an `line_item_id` is not provided, all line items will be returned.
    """
    mappings, conditionals = database_mappings(
        [
            {"name": "line_item.campaign_id", "value": campaign_id},
            {"name": "line_item.id", "value": line_item_id},
        ]
    )
    data = database(
        f"""
        SELECT 
            campaign.name as campaign_name,
            line_item.*,
            line_item.actual_amount + line_item.adjustment as "recorded_amount"
        FROM line_item
        JOIN campaign ON campaign.id = line_item.campaign_id
        WHERE ({conditionals})
    """,
        mappings,
    )
    return LineItemModel(
        data=data or [],
        summary=get_summary(data),
        count=len(data),
    )


@app.patch("/line_item", tags=["line_item"])
async def update_line_item(line_item_id: int, adjustment: float) -> LineItemModel:
    """
    Update a existing line_item's adjustment value by `line_item_id`.
    """
    database(
        f"""
        UPDATE line_item
        SET adjustment = :adjustment
        WHERE line_item.id = :line_item_id
    """,
        {"adjustment": adjustment, "line_item_id": line_item_id},
    )
    return await get_line_item(line_item_id=[line_item_id])


@app.get("/invoice", tags=["line_item"])
async def create_invoice(
    campaign_id: List[int] = Query(None), line_item_id: List[int] = Query(None)
):  # -> InvoiceModel:
    """
    Generate the data needed for an invoice report
    """
    today = datetime.date.today()

    # First day of the current month
    first_day = datetime.date(today.year, today.month, 1)

    # Last day of the current month
    _, num_days = calendar.monthrange(today.year, today.month)
    last_day = datetime.date(today.year, today.month, num_days)

    data = await get_line_item(line_item_id=line_item_id, campaign_id=campaign_id)
    data = [
        {
            "start_date": first_day,
            "end_date": last_day,
            "invoice_date": today,
            **line_data.dict(),
        }
        for line_data in data.data
    ]
    return InvoiceModel(
        data=data or [],
        summary=get_summary(data),
        count=len(data),
    )
