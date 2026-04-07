import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { LangProvider, useLang } from "@/contexts/LangContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackVisit } from "@/lib/trackVisit";

const TermsContent = () => {
  const { t } = useLang();

  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-5 md:px-6 pt-28 md:pt-36 pb-16 md:pb-24 max-w-4xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("terms.back")}
        </a>

        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
          {t("terms.heading")}
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          {t("terms.version")}
        </p>

        <div className="prose prose-sm md:prose-base max-w-none text-foreground/90 space-y-8">
          {/* Article 1 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 1 – Definitions</h2>
            <p>The following definitions apply to these general terms and conditions:</p>
            <ul className="space-y-3 list-none pl-0">
              <li><strong>"General Terms and Conditions"</strong>: these general terms and conditions (version of February 24, 2026), which apply to each quotation, purchase order submitted to Belgomed BV, each acceptance by Belgomed BV and in general any agreement that is concluded between Belgomed BV and the Customer (hereinafter "Agreement").</li>
              <li><strong>"Customer"</strong>: the (future) contracting party of Belgomed BV who has placed an order and/or with whom an Agreement is concluded.</li>
              <li><strong>"Belgomed BV"</strong>: Belgomed BV, with registered office at Trichterheideweg 11, 3500 Hasselt, Belgium.</li>
              <li><strong>"Products"</strong>: any product sold by Belgomed BV to the Customer as specified in a Purchase Order or any other products purchased by Customer or delivered to Customer pursuant to an Agreement.</li>
              <li><strong>"Portal"</strong>: the customized web portal used by Belgomed BV for sale of the Products and delivery of the Services.</li>
              <li><strong>"Purchase Order"</strong>: any order for Products or Services delivered by Belgomed BV, insofar accepted by Belgomed BV.</li>
              <li><strong>"Services"</strong>: any services delivered by Belgomed BV to the Customer as specified in a Purchase Order or any other services delivered to the Customer pursuant to an Agreement.</li>
            </ul>
          </section>

          {/* Article 2 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 2 – Acceptance of the General Terms and Conditions and conclusion of the Agreement</h2>
            <p>As soon as an Agreement is concluded between Belgomed BV and a Customer on the basis of a Purchase Order these General Terms and Conditions apply, not merely for the Agreement on the basis of the Purchase Order but also for all subsequent agreements with the Customer, unless agreed otherwise or unless another version of these General Terms and Conditions was expressly declared applicable to this/these later agreement(s).</p>
            <p>These General Terms and Conditions take precedence over the Customer's own general (purchase) terms and conditions, and the Customer acknowledges that only documents originating from Belgomed BV govern the contractual rights and obligations between the Customer and Belgomed BV. The sending of an order form, purchase order or any other document to confirm the order and acceptance of the quotation by the Customer has no influence whatsoever on the provisions of this Article.</p>
            <p>If a quotation contains deviations from the General Terms and Conditions, the provisions of the Agreement prevail. However, all other provisions of the General Terms and Conditions remain fully applicable. In addition, deviating provisions in a quotation apply only to the Services mentioned in that specific quotation and not to subsequent agreements that would come into effect (these General Terms and Conditions will remain fully applicable to that agreement).</p>
            <p>An Agreement can only validly be concluded if the Agreement is signed by a person who is authorised by the Belgomed BV articles of association to validly bind it or by a person who has received an explicit power of attorney for such by the competent body. In any case, arrangements or agreements with employees, agents, representatives, intermediaries, etc. are never binding on Belgomed BV unless they are confirmed by the persons mentioned in this Article. However, the Customer who has sent a purchase order cannot rely on this article to claim that an Agreement has not been concluded.</p>
          </section>

          {/* Article 3 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 3 – Offer</h2>
            <p>Offers and quotations of Belgomed BV ("Offer"), whether sent to the Customer via any means of written communication whether offers originating from the Portal, are strictly limited to the Products, Services and prices mentioned in the Offer. The Customer acknowledges that offers from the Portal may be subject to alteration resulting from exceptional errors of the Portal and the real-time stock consultation to be used by the Customer in the Portal.</p>
            <p>Changes to the Agreement (such as Products and Services not provided for in the Offer) can only be made in accordance with Article 4 of these General Terms and Conditions.</p>
            <p>All prices stated by Belgomed BV for the Products and/or Services are excl. VAT or other costs associated with the performance of the Services that are not provided for in the Offer, unless explicitly stated otherwise in the Quotation.</p>
            <p>Information made available by Belgomed BV about the Products and Services only contains general information that does not bind Belgomed BV and that cannot be relied upon unconditionally. The Agreement is subject only to the provisions of the quotation and any other aspect that was agreed in writing by the parties.</p>
          </section>

          {/* Article 4 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 4 – Changes to Agreements</h2>
            <p>Changes to an Agreement after its conclusion (such as a request for additional Products or Services) will only become part of the Agreement if the agreement regarding these changes has been confirmed in writing by Belgomed BV. In the event that these changes result in additional costs or additional work, these items may be invoiced by Belgomed BV to the Customer (either at the price stated in the Agreement with regard to the change or on a cost-plus basis at the usual rates for working on such a cost-plus basis).</p>
            <p>In the case of full or partial annulment of the Agreement, the Customer is required to pay Belgomed BV 50% of all amounts owed by the Customer pursuant to the Agreement, without prejudice to the right to payment of any outstanding invoice or other amount due, and without prejudice to the right of Belgomed BV to claim higher compensation if actual damages due to the annulment exceeds the compensation stipulated in this Article.</p>
          </section>

          {/* Article 5 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 5 – Use of Portal</h2>
            <p>The Customer is responsible for the use of the Portal and protection of any username or password used for access to the Portal. If third parties gain access to the Portal using user names or passwords from the Customer and damages result from such access, then the Customer shall indemnify Belgomed BV in full. Agreements resulting from such access, for instance orders made by staff or third parties on behalf of the Customer, shall be deemed binding to the Customer and made by the Customer.</p>
            <p>Belgomed BV is not liable nor responsible for information, data, files or other items made available by the Customer on the Portal or sent to Belgomed BV via any other means of communication. The Customer indemnifies Belgomed BV in full for any and all claim from third parties regarding such information, data, files or other items.</p>
            <p>Belgomed BV is not liable nor responsible for damages resulting from any computer virus infecting the computer or IT-infrastructure of the Customer as a result of the use of the Portal. The Customer is required to use sufficient virus protection software.</p>
          </section>

          {/* Article 6 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 6 – Delivery</h2>
            <p>Unless otherwise agreed and specified in the Purchase Order, Products are delivered EXW warehouse of Belgomed BV and transported to Customer according to the instructions of the Customer.</p>
            <p>Any Service delivered to the Customer is on the basis of the best efforts of the Customer and without any guarantee that the result of the Services will be any result required by the Customer but not explicitly agreed upon between Belgomed BV and the Customer. Any guarantee must be confirmed in writing by Belgomed BV for such result to be binding for Belgomed BV.</p>
            <p>The Customer also acknowledges that for the delivery of Products and Services, Belgomed BV may rely on information and assumptions provided by the Customer. Any information relevant for the delivery of Products and Services must be sent to Belgomed BV in writing before the delivery. If any information is not communicated and this results in any damages then Belgomed BV is not liable for such damages.</p>
            <p>Belgomed BV tries to deliver Products and Services as quickly as possible and within the timeframe agreed with the Customer, but the Customer acknowledges that delivery periods or dates are always indicative and do not bind Belgomed BV, unless clearly agreed otherwise in writing. Without prejudice to what is mentioned in article 7, any delay in delivery cannot result in a dissolution or annulment of the Agreement or in any claim for damage compensation other than damages which are covered by the insurance policies of Belgomed BV. In case of a lack of coverage by these insurance policies the liability of Belgomed BV is limited to the price of (that part of) the Products or Services not delivered (in time).</p>
            <p>Any binding delivery deadlines or dates apply only if all data required for execution of the Agreement was received by Belgomed BV on time.</p>
            <p>In the event of a delay or defects in the delivery of Products or Services, the Customer may not have the Services or Products delivered by third parties at the expense of Belgomed BV, unless accepted in writing by Belgomed BV.</p>
            <p>If any part of the Services involves the use of certain software made available to the Customer, then the Customer is only granted a non-exclusive license to the software for the duration necessary for the execution of the Agreement. Any provisions of software license agreements from third parties, which may be applicable on the software, are also applicable on the license granted to the Customer.</p>
            <p>Belgomed BV is entitled to outsource the Agreement or parts thereof to third parties or to have them carried out by third parties.</p>
          </section>

          {/* Article 7 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 7 – Verification of Products</h2>
            <p>All products purchased by Belgomed BV must be verified to ensure they are approved and suitable for sale within Belgium. Belgomed BV is responsible for ensuring that all products comply with the relevant Belgian regulations and standards before they are offered for sale. The Customer must provide all necessary documentation and evidence to demonstrate that the products meet all Belgian regulatory requirements at the time of purchase. Failure to provide such verification may result in rejection of the products at the discretion of Belgomed BV and could lead to the annulment of the purchase order under the terms stipulated in these General Terms and Conditions.</p>
          </section>

          {/* Article 8 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 8 – Term and rescission</h2>
            <p>Agreements are entered into for the duration necessary for the delivery of the Products and/or Services, without prejudice to the provisions of other articles of these General Terms and Conditions.</p>
            <p>In the event of rescission of the Agreement by or due to actions of the Customer, Belgomed BV is entitled by operation of law ("de iure"), without notice of default, to payment of 50% of all amounts owed by the Customer in execution of the Agreement without prejudice to the right to payment of any outstanding invoice or other amount due, and without prejudice to the right of Belgomed BV to claim higher compensation if actual damages due to the annulment exceeds the compensation stipulated in this Article. The Customer acknowledges that the following circumstances shall automatically give rise to a rescission of the Agreement to which Belgomed BV is entitled within the meaning of this Article, unless Belgomed BV waives this breach in writing and pursues execution of the Agreement, right Belgomed BV always has:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Non-payment of the amounts due by the Customer under the Agreement within 15 days after notice of default by Belgomed BV;</li>
              <li>Bankruptcy or dissolution of the Customer;</li>
              <li>An infringement of the provisions of these General Terms and Conditions for which the sanction of rescission was expressly foreseen.</li>
            </ul>
          </section>

          {/* Article 9 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 9 – Payment</h2>
            <p>Belgomed BV reserves the right, and the Customer agreed with this, to request payment of an advance, advance specified in the Purchase Order or in the invoice sent to the Customer specifying the advance payment to be made. Delivery of Products and/or Services may be made dependent on payment of such advance.</p>
            <p>All amounts due pursuant to the Agreement are to be paid within 30 days, unless a shorter payment term is mentioned on invoices sent to the Customer or unless otherwise agreed in writing.</p>
            <p>In the case of late payment of any amount due under the Agreement Belgomed BV is, by operation of law ("de iure"), entitled to a damage compensation of 10% of the amount due as well as interest on late payments at the interest rate determined in accordance with the Belgian Act of 2 August 2002, and is entitled to suspend delivery of Products or Services.</p>
            <p>The Customer waives its right to suspend payment of amounts due in the event of a claim or complaint.</p>
            <p>As a guarantee for payment of amounts due to Belgomed BV, the Customer pledges all claims the Customer has and may have towards third parties, such as its own customers.</p>
            <p>If an order is done by two or more persons or companies, they will be jointly and severally liable for execution of the Agreement and all obligations pursuant to the Agreement.</p>
            <p>All products remain the property of Belgomed BV until full payment of all amounts due pursuant to the Agreement, including but not limited to invoices, interest, damages and costs. In the event of non-payment by the due date specified in the invoice, Belgomed BV is entitled to reclaim the Products. A bankruptcy of the Customer does not affect Belgomed BV's right to claim back the Products.</p>
          </section>

          {/* Article 10 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 10 – Liability</h2>
            <p>Belgomed BV (including its representatives, agents and/or employees) is only liable for damages caused by failure to comply with its contractual obligations, if and insofar such damages are caused by fraud, deceit or wilful or gross negligence.</p>
            <p>In any case liability of Belgomed BV is always limited to amounts covered by the insurance policies of Belgomed BV. In case of a lack of coverage by these insurance policies the liability of Belgomed BV is limited to the price of the Products or Services to be delivered pursuant to the Agreement. Belgomed BV is never liable for indirect damages, loss of profit, lost savings or damages to third parties.</p>
          </section>

          {/* Article 11 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 11 – Complaints and warranty</h2>
            <p>Complaints or defects must be reported to Belgomed BV within 14 days following knowledge of the elements on which the complaint is based or of the defect.</p>
            <p>The Customer shall grant all assistance required by Belgomed BV for investigation of the complaint, including making it possible for Belgomed BV to investigate or have investigated on site the quality and/or quantity of the Products or Services to which the complaint relates. Refusal to do so, results in a waiver of any right to damages.</p>
            <p>If Belgomed BV considers a defect or a complaint to be correct, Belgomed BV has the choice either to re-supply the Products or Services found to be defective free of charge, or to give the Customer a discount on the price, discount in relation with the defect and notwithstanding any limitation of liability clause mentioned in these General Terms and Conditions.</p>
          </section>

          {/* Article 12 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 12 – Force Majeure</h2>
            <p>In case of force majeure Belgomed BV has the right to suspend the execution of the Agreement or to cancel it in whole or in part, without any judicial intervention. Belgomed BV is not liable for any damage or loss resulting from this.</p>
            <p>"Force majeure" includes any cause beyond Belgomed BV's control that makes the execution of the agreement by Belgomed BV impossible or particularly burdensome, such as terrorist attacks, partial or general strikes, operational accidents, fire, machinery breakdowns, pandemics, bankruptcy of suppliers, lack of raw materials, decisions or acts by public authorities, whether or not these circumstances were foreseeable at the time the agreement was concluded.</p>
          </section>

          {/* Article 13 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 13 – Intellectual Property</h2>
            <p>The right of use of any work protected by intellectual property laws (such as the Portal, designs, documentation, drawings, software, data, etc.) and which results from the execution of the Agreement, is granted to the Customer by Belgomed BV upon the condition of payment of all amounts due to Belgomed BV.</p>
            <p>The Customer acknowledges that the Portal, the database of Belgomed BV and all data found on the Portal or other documents sent to the Customer (such as prices) are trade secrets of Belgomed BV and therefore subject to strict confidentiality according to article 14.</p>
            <p>Belgomed BV at all times remains the sole owner of the copyright and other intellectual property rights on works, documents, data, software used for the execution of the Agreement. The Customer only has a non-exclusive license for the purpose of execution of the Agreement. Reproduction is only possible after written consent by Belgomed BV and any indication to the rights of Belgomed BV may not be removed. Software or other items that belong to third parties remain the exclusive property of these third parties, and the right of use is governed by any software license agreement or other agreement with those third parties.</p>
          </section>

          {/* Article 14 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 14 – Privacy</h2>
            <p>Belgomed BV only processes personal data to a limited extent and this for the execution of the Agreement. Belgomed BV confirms to act according to all privacy laws applicable to Belgomed BV, including the General Data Protection Regulation, 'GDPR' and to process data in a proper, careful and transparent manner. However, the Customer is required to inform everyone that is involved in the execution of the Agreement, such as personnel of the Customer, of the rights they have regarding the processing of data by Belgomed BV (right to request access, to rectification, addition, erasure or restriction, to object to the processing or request data portability).</p>
            <p>If Belgomed BV uses third parties for the processing of personal data, then Belgomed BV shall require that those third parties comply with the legal provisions. Belgomed BV has its own information security policy and applies adequate appropriate technical and organisational measures to ensure that the processing meets the requirements of the GDPR and that the protection of the rights of those involved in the processing is guaranteed. These measures are tailored to the risk involved in the processing. Belgomed BV ensures the safety and proper use of access codes, user names and passwords, as well as the regular change of these codes and passwords, in order to access and process the personal data. Belgomed BV undertakes to make every effort to ensure that anyone who has access to the personal data handles codes and passwords in a confidential manner.</p>
            <p>Belgomed BV shall inform the Customer without undue delay, via e-mail, if a possible breach with regard to personal data is discovered.</p>
          </section>

          {/* Article 15 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 15 – Confidentiality</h2>
            <p>All information, files and other items that are exchanged between Belgomed BV and the Customer pursuant to an Agreement are strictly confidential and may only be used by the two parties for the purpose of implementing the Agreement and providing the Services, unless otherwise stipulated in these General Terms and Conditions or in the Agreement.</p>
          </section>

          {/* Article 16 */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Article 16 – General</h2>
            <p>The Customer has no right to transfer any rights and obligations under an Agreement nor to transfer the Agreement to third parties without the prior express consent of Belgomed BV.</p>
            <p>The invalidity of any provision of these terms and conditions will have no effect on the validity of the remaining provisions of these General Terms and Conditions, and will not lead to the invalidity of these provisions. Invalid clauses or provisions shall be deemed to be altered by law and automatically to such extent that they are no longer invalid. In case this is not possible, then Belgomed BV and the Customer will negotiate in good faith to replace the invalid or unenforceable provision with a legally valid and enforceable provision that matches as closely as possible the purpose and intent of the original provision.</p>
            <p>Belgian law applies to the Agreement, and the courts of the judicial district of Antwerp, Hasselt division, have exclusive jurisdiction.</p>
          </section>

          {/* Contact */}
          <section className="glass-card p-6 md:p-8 mt-12">
            <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">Contact</h2>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Belgomed BV</p>
              <p>Trichterheideweg 11</p>
              <p>3500 Hasselt, Belgium</p>
              <p className="mt-3">Email: <a href="mailto:info@belgomed.be" className="text-primary hover:underline">info@belgomed.be</a></p>
              
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Terms = () => (
  <LangProvider>
    <TermsContent />
  </LangProvider>
);

export default Terms;
