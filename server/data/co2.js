// # --------------------------------------------------------------------
// # USE OF NOAA ESRL DATA
// #
// # These data are made freely available to the public and the
// # scientific community in the belief that their wide dissemination
// # will lead to greater understanding and new scientific insights.
// # The availability of these data does not constitute publication
// # of the data.  NOAA relies on the ethics and integrity of the user to
// # insure that ESRL receives fair credit for their work.  If the data
// # are obtained for potential use in a publication or presentation,
// # ESRL should be informed at the outset of the nature of this work.
// # If the ESRL data are essential to the work, or if an important
// # result or conclusion depends on the ESRL data, co-authorship
// # may be appropriate.  This should be discussed at an early stage in
// # the work.  Manuscripts using the ESRL data should be sent to ESRL
// # for review before they are submitted for publication so we can
// # insure that the quality and limitations of the data are accurately
// # represented.
// #
// # Contact:   Ed Dlugokencky (303 497 6228; ed.dlugokencky@noaa.gov)
// #
// # File Creation:  Tue Jun  5 10:26:47 2018
// #
// # RECIPROCITY
// #
// # Use of these data implies an agreement to reciprocate.
// # Laboratories making similar measurements agree to make their
// # own data available to the general public and to the scientific
// # community in an equally complete and easily accessible form.
// # Modelers are encouraged to make available to the community,
// # upon request, their own tools used in the interpretation
// # of the ESRL data, namely well documented model code, transport
// # fields, and additional information necessary for other
// # scientists to repeat the work and to run modified versions.
// # Model availability includes collaborative support for new
// # users of the models.
// # --------------------------------------------------------------------
// #
// #
// # See www.esrl.noaa.gov/gmd/ccgg/trends/ for additional details.
// #
// #
// # The uncertainty in the global annual mean is estimated using a monte carlo
// # technique that computes 100 global annual averages, each time using a
// # slightly different set of measurement records from the NOAA ESRL cooperative
// # air sampling network.  The reported uncertainty is the mean of the standard
// # deviations for each annual average using this technique. Please see
// # Conway et al., 1994, JGR, vol. 99, no. D11. for a complete discussion.
// #
// # CO2 expressed as a mole fraction in dry air, micromol/mol, abbreviated as ppm
// #
// # NOTE: In general, the data presented for the last year are subject to change,
// # depending on recalibration of the reference gas mixtures used, and other quality
// # control procedures. Occasionally, earlier years may also be changed for the same
// # reasons.  Usually these changes are minor.
// #
// # year     mean      unc
module.exports = {
  CO2: [
    {year: 1980, ppm: 338.80, uncertainty: 0.10},
    {year: 1981, ppm: 339.99, uncertainty: 0.10},
    {year: 1982, ppm: 340.76, uncertainty: 0.10},
    {year: 1983, ppm: 342.43, uncertainty: 0.10},
    {year: 1984, ppm: 343.98, uncertainty: 0.10},
    {year: 1985, ppm: 345.46, uncertainty: 0.10},
    {year: 1986, ppm: 346.88, uncertainty: 0.10},
    {year: 1987, ppm: 348.61, uncertainty: 0.10},
    {year: 1988, ppm: 351.14, uncertainty: 0.10},
    {year: 1989, ppm: 352.78, uncertainty: 0.10},
    {year: 1990, ppm: 353.97, uncertainty: 0.10},
    {year: 1991, ppm: 355.29, uncertainty: 0.10},
    {year: 1992, ppm: 355.99, uncertainty: 0.10},
    {year: 1993, ppm: 356.71, uncertainty: 0.10},
    {year: 1994, ppm: 358.20, uncertainty: 0.10},
    {year: 1995, ppm: 360.02, uncertainty: 0.10},
    {year: 1996, ppm: 361.79, uncertainty: 0.10},
    {year: 1997, ppm: 362.90, uncertainty: 0.10},
    {year: 1998, ppm: 365.55, uncertainty: 0.10},
    {year: 1999, ppm: 367.63, uncertainty: 0.10},
    {year: 2000, ppm: 368.81, uncertainty: 0.10},
    {year: 2001, ppm: 370.41, uncertainty: 0.10},
    {year: 2002, ppm: 372.41, uncertainty: 0.10},
    {year: 2003, ppm: 374.96, uncertainty: 0.10},
    {year: 2004, ppm: 376.78, uncertainty: 0.10},
    {year: 2005, ppm: 378.81, uncertainty: 0.10},
    {year: 2006, ppm: 380.93, uncertainty: 0.10},
    {year: 2007, ppm: 382.68, uncertainty: 0.10},
    {year: 2008, ppm: 384.78, uncertainty: 0.10},
    {year: 2009, ppm: 386.28, uncertainty: 0.10},
    {year: 2010, ppm: 388.56, uncertainty: 0.10},
    {year: 2011, ppm: 390.44, uncertainty: 0.10},
    {year: 2012, ppm: 392.45, uncertainty: 0.10},
    {year: 2013, ppm: 395.19, uncertainty: 0.10},
    {year: 2014, ppm: 397.11, uncertainty: 0.10},
    {year: 2015, ppm: 399.41, uncertainty: 0.10},
    {year: 2016, ppm: 402.83, uncertainty: 0.10},
    {year: 2017, ppm: 404.98, uncertainty: 0.10}
  ]
}
