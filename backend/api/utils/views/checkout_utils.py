from decimal import Decimal, ROUND_HALF_UP
from math import ceil
from sympy import sympify

def group_by_active_role(employee_clockins):
    res = {}
    for clock_in in employee_clockins:
        if clock_in.active_role_id not in res:
            res[clock_in.active_role_id] = [clock_in]
        else:
            res[clock_in.active_role_id].append(clock_in)
    return res


def calculate_tipout_received_from_net_sales(formula, employee_list, net_sales):
    tipout_received = 0
    formula, min_sales, max_tipout, is_time_based = formula.values()

    if min_sales and min_sales > net_sales:
        return Decimal("{:.2f}".format(tipout_received))

    expression = sympify(formula)
    calculated_tipout = expression.evalf(subs={"net_sales": net_sales})
    if max_tipout and is_time_based:
        tipout_received = min(max_tipout, calculated_tipout)
    elif max_tipout and not is_time_based:
        tipout_received = min(max_tipout * len(employee_list), calculated_tipout)
    else:
        tipout_received = calculated_tipout
    tipout_received = Decimal(str(tipout_received))

    return tipout_received.quantize(Decimal("1"), rounding=ROUND_HALF_UP) if expression.free_symbols else Decimal("{:.2f}".format(tipout_received))
