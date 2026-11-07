"""Build the one-page résumé PDF the site serves from the structured Markdown in resume.md.

From the repo root:  python resume/build_resume.py resume/resume.md app/public/AidenMolyneaux_Resume.pdf 0.94
Needs reportlab and pypdf (resume/requirements.txt) and the Calibri fonts that ship with Windows.
The last argument scales the type to fit one page; the script exits 2 when the result runs over.
Layout: single column, Letter, Calibri, standard headings. Role headers use a two-cell
table only to right-align dates; the text order stays title, dates, so parsers read it in order.
"""
import re, sys
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

FONTS = 'C:/Windows/Fonts/'
pdfmetrics.registerFont(TTFont('Calibri', FONTS + 'calibri.ttf'))
pdfmetrics.registerFont(TTFont('Calibri-Bold', FONTS + 'calibrib.ttf'))
pdfmetrics.registerFont(TTFont('Calibri-Italic', FONTS + 'calibrii.ttf'))
pdfmetrics.registerFont(TTFont('Calibri-BoldItalic', FONTS + 'calibriz.ttf'))
from reportlab.pdfbase.pdfmetrics import registerFontFamily
registerFontFamily('Calibri', normal='Calibri', bold='Calibri-Bold', italic='Calibri-Italic', boldItalic='Calibri-BoldItalic')

src, out = sys.argv[1], sys.argv[2]
S = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0  # font scale to fit one page

# ---------- parse ----------
doc = {'name': '', 'header': {}, 'summary': '', 'experience': [], 'projects': [], 'skills': [], 'education': []}
section = None; org = None; role = None
for raw in open(src, encoding='utf-8'):
    line = raw.rstrip('\n')
    if not line.strip():
        continue
    if line.startswith('# '):
        doc['name'] = line[2:].strip(); continue
    if line.startswith('## '):
        section = line[3:].strip().lower(); org = role = None; continue
    if section == 'header':
        k, v = line.split(':', 1); doc['header'][k.strip()] = v.strip(); continue
    if section == 'summary':
        doc['summary'] += (' ' if doc['summary'] else '') + line.strip(); continue
    if section == 'skills':
        k, v = line.split(':', 1); doc['skills'].append((k.strip(), v.strip())); continue
    if section in ('experience', 'education'):
        if line.startswith('### '):
            name, place = [s.strip() for s in line[4:].split('|')]
            org = {'org': name, 'place': place, 'roles': []}; doc[section].append(org); continue
        if line.startswith('#### '):
            title, dates = [s.strip() for s in line[5:].split('|')]
            role = {'title': title, 'dates': dates, 'bullets': []}; org['roles'].append(role); continue
        if line.startswith('- '):
            role['bullets'].append(line[2:].strip()); continue
    if section == 'projects':
        if line.startswith('### '):
            parts = [s.strip() for s in line[4:].split('|')]
            org = {'name': parts[0], 'link': parts[1], 'tech': parts[2], 'lines': []}; doc['projects'].append(org); continue
        if line.startswith('- '):
            org['lines'].append(line[2:].strip()); continue

# ---------- styles ----------
ink = colors.HexColor('#1a1a1a'); soft = colors.HexColor('#444444'); rule = colors.HexColor('#999999')
base = dict(fontName='Calibri', textColor=ink, leading=12.1 * S, fontSize=10.2 * S)
st = {
    'name': ParagraphStyle('name', fontName='Calibri-Bold', fontSize=21 * S, leading=24 * S, textColor=ink, alignment=TA_LEFT, spaceAfter=1),
    'sub': ParagraphStyle('sub', **{**base, 'fontSize': 10.6 * S, 'leading': 13 * S, 'textColor': soft}),
    'contact': ParagraphStyle('contact', **{**base, 'fontSize': 9.6 * S, 'leading': 12 * S, 'textColor': soft}),
    'h': ParagraphStyle('h', fontName='Calibri-Bold', fontSize=10.4 * S, leading=12.5 * S, textColor=ink, spaceBefore=6.5 * S, spaceAfter=1.5 * S),
    'body': ParagraphStyle('body', **base),
    'org': ParagraphStyle('org', **{**base, 'fontName': 'Calibri-Bold'}),
    'role': ParagraphStyle('role', **{**base}),
    'right': ParagraphStyle('right', **{**base, 'alignment': TA_RIGHT, 'textColor': soft}),
    'bullet': ParagraphStyle('bullet', **{**base, 'leftIndent': 11 * S, 'bulletIndent': 2 * S, 'spaceAfter': 0.9 * S, 'bulletFontName': 'Calibri'}),
    'skill': ParagraphStyle('skill', **{**base, 'leftIndent': 0, 'spaceAfter': 0.8 * S}),
}
MARGIN = 0.6 * inch
W = letter[0] - 2 * MARGIN - 12  # the frame keeps 6pt of padding on each side

def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def link(t):
    # make each contact token clickable, shown as plain text
    out = []
    for tok in t.split(' · '):
        if '@' in tok:
            out.append(f'<link href="mailto:{tok}" color="#444444">{tok}</link>')
        elif re.match(r'^(?:[\w-]+\.)+(?:com|dev|ca|io)(?:/[\w./#-]*)?$', tok):
            out.append(f'<link href="https://{tok}" color="#444444">{tok}</link>')
        else:
            out.append(tok)
    return ' · '.join(out)

def row(left, right, ls='org', rs='right', split=0.72):
    t = Table([[Paragraph(left, st[ls]), Paragraph(right, st[rs])]], colWidths=[W * split, W * (1 - split)])
    t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                           ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0)]))
    return t

def heading(text):
    return [Paragraph(text.upper(), st['h']), HRFlowable(width='100%', thickness=0.6, color=rule, spaceBefore=0, spaceAfter=3 * S)]

def bullets(items):
    return [Paragraph(esc(b), st['bullet'], bulletText='•') for b in items]

# ---------- build ----------
h = doc['header']
story = [
    Paragraph(esc(doc['name']), st['name']),
    Paragraph(esc(h['title']) + '  ·  ' + esc(h['location']), st['sub']),
    Paragraph(link(h['contact']), st['contact']),
    Paragraph('<b>Clearances:</b> ' + esc(h['clearances']), st['contact']),
]
story += heading('Summary') + [Paragraph(esc(doc['summary']), st['body'])]

story += heading('Experience')
for o in doc['experience']:
    block = [row(esc(o['org']), esc(o['place']))]
    for r in o['roles']:
        block.append(row(esc(r['title']), esc(r['dates']), ls='role'))
        block += bullets(r['bullets'])
    block.append(Spacer(1, 3.5 * S))
    story.append(KeepTogether(block) if len(o['roles']) == 1 else block[0])
    if len(o['roles']) > 1:
        story += block[1:]

story += heading('Projects')
for p in doc['projects']:
    left = f"<b>{esc(p['name'])}</b>  <font color='#444444'>{link(p['link'])}</font>"
    block = [row(left, esc(p['tech']), ls='role', split=0.58)] + bullets(p['lines'])
    story.append(KeepTogether(block))

story += heading('Skills')
for k, v in doc['skills']:
    story.append(Paragraph(f'<b>{esc(k)}:</b> {esc(v)}', st['skill']))

story += heading('Education')
for o in doc['education']:
    story.append(row(esc(o['org']), esc(o['place'])))
    for r in o['roles']:
        story.append(row(esc(r['title']), esc(r['dates']), ls='role'))

pdf = SimpleDocTemplate(out, pagesize=letter, leftMargin=MARGIN, rightMargin=MARGIN, topMargin=0.45 * inch, bottomMargin=0.45 * inch,
                        title=f"{doc['name']} résumé", author=doc['name'], subject='Software Engineer II, Ottawa', creator='reportlab')
pdf.build(story)

from pypdf import PdfReader
n = len(PdfReader(out).pages)
print('pages', n)
sys.exit(0 if n == 1 else 2)
