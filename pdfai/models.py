from django.db import models
import json

class RuleRfrnc(models.Model):
    rule_id = models.AutoField(primary_key=True)
    rule_name = models.CharField(max_length=50)
    rule_description = models.CharField(max_length=200, null=True)

    class Meta:
        db_table = 'rule_rfrnc'

    def __str__(self):
        return f"{self.rule_id} {self.rule_name}"
    
class RuleMapping(models.Model):
    id = models.AutoField(primary_key=True)
    rule_id = models.IntegerField()
    source_column = models.CharField(max_length=100)
    dest_column = models.CharField(max_length=100)
    handler = models.CharField(max_length=200, null=True)
    class Meta:
        db_table = 'rule_mapping'

class Trades(models.Model):
    trade_id = models.AutoField(primary_key=True)
    trade_date = models.DateField(max_length=100,null=True)
    settle_date = models.DateField(max_length=100,null=True)
    transaction_code = models.CharField(max_length=100,null=True)
    asset_name = models.CharField(max_length=100,null=True)
    asset_id = models.CharField(max_length=100,null=True)
    shares = models.CharField(max_length=100,null=True)
    price_local = models.CharField(max_length=100,null=True)
    price_base = models.CharField(max_length=100,null=True)
    net_amount_local = models.CharField(max_length=100,null=True)
    net_amount_base = models.CharField(max_length=100,null=True)
    local_currency = models.CharField(max_length=100,null=True)
    order_client_name = models.CharField(max_length=100,null=True)
    ex_rate = models.CharField(max_length=100,null=True)
    # file_ref = models.CharField(max_length=300,null=True)
    class Meta:
        db_table = 'trades'
    def toJSON(self):
        return json.dumps(dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]]))


class Workflow(models.Model):
    order_num = models.IntegerField()
    work_flow_id = models.IntegerField(default=0)
    work_flow_name = models.CharField(max_length=100)
    work_flow_desc = models.CharField(max_length=500, null=True)
    lib_id = models.IntegerField()
    config = models.CharField(max_length=1000,null=True)
    node_list = models.CharField(max_length=2000,null=True)
    edge_list = models.CharField(max_length=2000,null=True)
    config_list = models.CharField(max_length=1000,null=True)
    create_user = models.CharField(max_length=500, null=True, default="Admin")
    class Meta:
        db_table = 'work_flow'

class Libs(models.Model):
    lib_id = models.AutoField(primary_key=True)
    lib_name = models.CharField(max_length=500)
    lib_func = models.CharField(max_length=500)
    lib_type = models.CharField(max_length=100, null=True)
    class Meta:
        db_table = 'libs'
    