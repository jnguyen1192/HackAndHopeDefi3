from fpdf import FPDF  # fpdf class @https://towardsdatascience.com/creating-pdf-files-with-python-ad3ccadfae0f


class PDF(FPDF):
    def texts(self, name):
        with open(name, 'rb') as xy:
            txt = xy.read().decode('latin-1')
        self.set_xy(10.0, 80.0)
        self.set_text_color(76.0, 32.0, 250.0)
        self.set_font('Arial', '', 12)
        self.multi_cell(0, 10, txt)

#pdf=PDF(format='A4') #page format. A4 is the default value of the format, you don't have to specify it.
# full syntax
#PDF(orientation={'P'(def.) or 'L'}, measure{'mm'(def.),'cm','pt','in'}, format{'A4'(def.),'A3','A5','Letter','Legal')
#default
pdf = PDF(orientation='P', unit='mm', format='A4')
pdf.add_page()
pdf.texts("../LICENSE")



pdf.output('test.pdf','F')

