module.exports = (template, prod) => {
  let outtput = template.replace(/{%TITLE%}/g, prod.title);
  outtput = outtput.replace(/{%AUTHOR%}/g, prod.author);
  outtput = outtput.replace(/{%GENRE%}/g, prod.genre);
  outtput = outtput.replace(/{%YEAR%}/g, prod.year_published);
  outtput = outtput.replace(/{%PRICE%}/g, prod.price);
  outtput = outtput.replace(/{%DESCRIPTION%}/g, prod.summary);
  outtput = outtput.replace(/{%ID%}/g, prod.id);
  return outtput;
};
