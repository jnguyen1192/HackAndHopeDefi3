# read audit data
def get_links_from_csv_file(file_name):
    import csv
    links = []
    with open(file_name, newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',')
        beg = True
        num_link = 0
        for row in list(spamreader)[1:]:
            if beg:
                # get column with link
                for index, col in enumerate(row):
                    # print(col[:4], "http://"[:4])
                    if col[:4] == "http://"[:4]:  # match using http
                        num_link = index
                        break
                beg = False
            links.append((row[num_link], row[num_link-2]))
        return links


links = get_links_from_csv_file('../data/marseille_audit_ecoles.csv')
print(links[:3])

import wget, os, sys
#create this bar_progress method which is invoked automatically from wget
def bar_progress(current, total, width=80):
  progress_message = "Downloading: %d%% [%d / %d] bytes" % (current / total * 100, current, total)
  # Don't use print() as it will print in new line every time.
  sys.stdout.write("\r" + progress_message)
  sys.stdout.flush()

if not os.path.exists("./marseille_audit"):
    os.makedirs("./marseille_audit")

print(len(links))

# TODO 1 Check file name
# TODO 2 Convert file to correct format
# TODO 3 Read document and synthetize
dir = "marseille_audit/"
i = 0
for link, filename in links:
    try:
        file = link.split("/")[-1]
        path_file = os.path.join(dir, file)
        if os.path.exists(path_file):
            # print(file, "already downloaded")
            try:
                os.rename(path_file, os.path.join(dir, filename))
                print("Rename file process")
                print(path_file, os.path.join(dir, filename))
            except:
                print(link, "\"" + filename + "\"")
        else:
            i += 1
            #print("Need to download")
            #wget.download(link, bar=bar_progress, out=dir)
    except:
        print("\n" +link + "not downloaded")
#print("Il reste " + str(i) + " téléchargements")