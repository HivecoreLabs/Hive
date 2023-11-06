from decimal import Decimal
from api.serializers import ReadLimitedClockInSerializer

def calculate_totals(checkouts):
    role_totals = {}
    for checkout in checkouts:
        role_id = checkout['checkout_tipout_breakdown__role_id']
        total = checkout['checkout_tipout_breakdown__total']
        if role_id and total:
            role_totals[role_id] = role_totals.get(role_id, 0) + total
    return role_totals


def calculate_total_role_hours(support_staff):
    role_hour_totals = {}
    for staff in support_staff:
        role_id = staff.active_role_id.id
        time_in = staff.time_in
        time_out = staff.time_out

        if time_in and time_out:
            role_hour_totals[role_id] = role_hour_totals.get(role_id,0) + (time_out-time_in).total_seconds()
    return role_hour_totals


def get_formula_and_determine_percent_worked(total_time_dictionary, staff_list, totals_dictionary):

    for staff in staff_list:
        time_in = staff.time_in
        time_out = staff.time_out
        if time_in and time_out:
            total_time_worked = (time_out - time_in).total_seconds()
            role_id = staff.active_role_id.id
            percent_worked = total_time_worked/total_time_dictionary[role_id]

            tipout_received = totals_dictionary[role_id] * Decimal(percent_worked)
            tipout_received = Decimal("{:.2f}".format(tipout_received))

            staff.tipout_received = tipout_received
            staff.save(update_fields=["tipout_received"])

    updated_staff_list = ReadLimitedClockInSerializer(staff_list, many=True)
    return updated_staff_list.data
