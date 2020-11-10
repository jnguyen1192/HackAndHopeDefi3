from fpdf import FPDF
# @source fpdf class @https://towardsdatascience.com/creating-pdf-files-with-python-ad3ccadfae0f


class PDF(FPDF):
    # Image to PDF

    def pdf_image(self, name):  # crée une image qui prend toute la page A4
        self.image(name, 0, 0, 210, 297)

    def school(self, school_name):  # Remplir le nom de l'école du formulaire SST page 1
        self.set_xy(47, 15)
        self.set_font('Times', '', 12)
        self.multi_cell(0, 0, school_name)

    def city(self, city):  # Remplir la ville du formulaire SST page 1
        self.set_xy(25, 30)
        self.set_font('Times', '', 12)
        self.multi_cell(0, 0, city)

    def suites_donnees(self, suites_donnees):  # Remplir la suite données du formulaire SST page 4
        self.set_xy(52, 52)
        self.set_font('Times', '', 12)
        self.multi_cell(144, int(len(suites_donnees) / 36), suites_donnees, 'LRTB', 'LT', 0)

    def directeur_trice(self, directeur_trice):  # Remplir le nom du directeur_trice du formulaire SST page 4
        self.set_xy(66, 147)
        self.set_font('Times', '', 12)
        self.multi_cell(0, 10, directeur_trice)

    def signature_directeur_trice_image(self, name):  # Signer à partir d'une image donnée le formulaire SST page 4
        self.image(name, 60, 155, 20, 30)


pdf = PDF(orientation='P', unit='mm', format='A4')
pdf.add_page()
pdf.pdf_image("fiche_sst_2014_protocole_sanitaire_non_respecte-1.png")
pdf.school("Collectif des écoles de Marseille")
pdf.city("Marseille")
pdf.add_page()
pdf.pdf_image("fiche_sst_2014_protocole_sanitaire_non_respecte-2.png")
pdf.add_page()
pdf.pdf_image("fiche_sst_2014_protocole_sanitaire_non_respecte-3.png")
pdf.add_page()
pdf.pdf_image("fiche_sst_2014_protocole_sanitaire_non_respecte-4.png")
paragraphe = "Défi 3 : Comment développer pour les écoles une plateforme permettant aux usagers des services public faire remonter de manière transparente des informations partageables entre les usagers ?"

pdf.suites_donnees(paragraphe)
pdf.directeur_trice("Arnaud")
pdf.signature_directeur_trice_image("signature_directeur_trice.png")
#pdf.set_auto_page_break(False)


pdf.output('test.pdf','F')

