from doc_annotator.utils.page_segmentation.segment import segment


def get_page_as_image(file_hash, page_num):
    # dechide pdf-ul din pdf_files cu numele file_hash
    # returneaza pagina cu numarul page_num din fisierul deschis anterior
    pass


def segment_page(file_hash, pagenum):
    pass
    # obtin pagina ca imagine
    # segmentez pagina


def segment_pdf(file_hash):
    pass
    # trec prin fiecare pagina si apelez segment_page, care imi retureaza chenarele
    # de pe pagina respectiva
    # le pune pe toate intr-un array si le returneaza, se tine minte si pagina la fiecare chenar
