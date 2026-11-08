"""Independent Decimal calculations for authored numeric questions, IDs 101–130."""
from decimal import Decimal as D, ROUND_HALF_UP
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
bank=json.loads((root/'assets/question-banks/fundamentals-exam-3-standard.json').read_text())
# Recompute from the quantities in each stem, not from rationale text.
expr=[
('24*33',0),('30*(66/2.2)',0),('40*18.5',0),('30*(44/2.2)',0),('15*(110/2.2)',0),('18*27-450',0),('25*(79.2/2.2)',0),('20*28',0),('12.5*16',0),('22*(47/2.2)',0),
('960/(24/6)',0),('720/(24/8)',0),('30*22/2',0),('18*(88/2.2)/(24/12)',0),('6*45/(24/8)',0),('0.4*20',0),('0.05*(154/2.2)',1),('48*15/(24/4)',0),('1200/(24/12)',0),('18*25/3',0),
('300/150*5',0),('80/40*2',0),('0.02*55/2',2),('20*(33/2.2)/2/100*5',1),('4*48/(24/8)/40*2',1),('125/250*5',1),('0.015*(132/2.2)/4',2),('12*18/3/120*5',0),('6/10*2',1),('0.1*(66/2.2)/2',1)]
import ast

def calc(node):
 if isinstance(node,ast.Expression):return calc(node.body)
 if isinstance(node,ast.Constant):return D(str(node.value))
 if isinstance(node,ast.BinOp):
  a,b=calc(node.left),calc(node.right)
  if isinstance(node.op,ast.Add):return a+b
  if isinstance(node.op,ast.Sub):return a-b
  if isinstance(node.op,ast.Mult):return a*b
  if isinstance(node.op,ast.Div):return a/b
 raise ValueError('Unexpected expression')
results=[]
for index,(expression,places) in enumerate(expr,101):
 q=next(q for q in bank['questions'] if q['id']==f'fund-e3-{index:04d}')
 exact=calc(ast.parse(expression,mode='eval'));rounded=exact.quantize(D(1).scaleb(-places),rounding=ROUND_HALF_UP)
 assert rounded==D(str(q['correct'])),(q['id'],rounded,q['correct'])
 results.append({'id':q['id'],'expression':expression,'unrounded':str(exact),'roundingPlaces':places,'rounding':'half up at final answer only','verifiedAnswer':str(rounded),'units':q['units'],'status':'PASS'})
(root/'assets/question-banks/audits/fundamentals-exam-3-math.json').write_text(json.dumps({'count':30,'results':results},indent=2)+'\n')
print('PASS: all 30 numeric answers independently recomputed with Decimal and explicit final rounding')
