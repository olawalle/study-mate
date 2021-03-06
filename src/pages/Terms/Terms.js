import React, { useContext } from "react";
import "./Terms.scss";
import { motion } from "framer-motion";
import Nav from "../../components/nav/Nav";
import backArrow from "../../assets/images/back.svg";
import { withRouter } from "react-router-dom";
import { userContext } from "../../store/UserContext";

export default withRouter(function Terms({ history }) {
  const context = useContext(userContext);
  const { isLoggedIn } = context;
  const back = () => {
    isLoggedIn ? history.push("/edit-profile") : history.push("/login");
  };

  return (
    <motion.div
      className="terms"
      initial={{ opacity: 0, x: "-5vw" }}
      animate={{ opacity: 1, x: "0vw" }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Nav />
      <div className="body">
        <div className="banner">
          <span>
            <svg
              version="1.1"
              x="0px"
              y="0px"
              height="15"
              className="mr25"
              viewBox="0 0 512.005 512.005"
              onClick={back}
              style={{
                transform: "rotate(180deg)",
                position: "relative",
                top: "-1px",
                cursor: "pointer",
              }}
            >
              <g>
                <g>
                  <path
                    fill="#ffffff"
                    d="M388.418,240.923L153.751,6.256c-8.341-8.341-21.824-8.341-30.165,0s-8.341,21.824,0,30.165L343.17,256.005
                      L123.586,475.589c-8.341,8.341-8.341,21.824,0,30.165c4.16,4.16,9.621,6.251,15.083,6.251c5.461,0,10.923-2.091,15.083-6.251
                      l234.667-234.667C396.759,262.747,396.759,249.264,388.418,240.923z"
                  />
                </g>
              </g>
            </svg>
            Terms and Conditions
          </span>
        </div>
        <div className="contents">
          <p>
            {" "}
            Please read these Terms and Conditions carefully before using Our
            Service.
          </p>
          <p className="x-big">Interpretation and Definitions</p>
          <p className="big"> Interpretation</p>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>
          <p className="big"> Definitions</p>
          For the purposes of these Terms and Conditions:
          <ul>
            <li>
              {" "}
              <b>Affiliate</b> means an entity that controls, is controlled by
              or is under common control with a party, where "control" means
              ownership of 50% or more of the shares, equity interest or other
              securities entitled to vote for election of directors or other
              managing authority.
            </li>
            <li>
              <b>Company</b> (referred to as either "the Company", "We", "Us" or
              "Our" in this Agreement) refers to InfoMall Nigeria Limited.
              {/* 22a
              Prof. Kiumi Akingbehin Street, Lekki, Lagos. */}
            </li>
            <li>
              <b>Country</b> refers to: Nigeria
            </li>
            <li>
              <b>Device</b> means any device that can access the Service such as
              a computer, a cellphone or a digital tablet.
            </li>
            <li>
              <b>Service</b> refers to the Website.
            </li>
            <li>
              <b>Terms and Conditions </b>(also referred as "Terms") mean these
              Terms and Conditions that form the entire agreement between You
              and the Company regarding the use of the Service.
            </li>
            <li>
              <b>Third-party Social Media Service</b> means any services or
              content (including data, information, products or services)
              provided by a third-party that may be displayed, included or made
              available by the Service.
            </li>
            <li>
              <b>Website</b> refers to StudyMate, accessible from
              www.studymate.ng
            </li>
            <li>
              <b>You</b> means the individual accessing or using the Service, or
              the company, or other legal entity on behalf of which such
              individual is accessing or using the Service, as applicable.
            </li>
          </ul>
          <p className="x-big">Acknowledgment</p>
          <p>
            These are the Terms and Conditions governing the use of this Service
            and the agreement that operates between You and the Company. These
            Terms and Conditions set out the rights and obligations of all users
            regarding the use of the Service.
          </p>
          <p>
            Your access to and use of the Service is conditioned on Your
            acceptance of and compliance with these Terms and Conditions. These
            Terms and Conditions apply to all visitors, users and others who
            access or use the Service.
          </p>
          <p>
            By accessing or using the Service, You agree to be bound by these
            Terms and Conditions. If You disagree with any part of these Terms
            and Conditions then You may not access the Service.
          </p>
          <p>
            The Company does permit those under 18 to use the Service as it is
            an educational content for learners of all ages. Our Privacy Policy
            is clear on how we treat your data. You can see our Privacy Policy
            for more.
          </p>
          <p>
            Your access to and use of the Service is also conditioned on Your
            acceptance of and compliance with the Privacy Policy of the Company.
            Our Privacy Policy describes our policies and procedures on the
            collection, use and disclosure of Your personal information when You
            use the Application or the Website and tells You about Your privacy
            rights and how the law protects You. Please read Our Privacy Policy
            carefully before using Our Service.
          </p>
          <p className="x-big">Links to Other Websites</p>
          <p>
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by the Company.
          </p>
          <p>
            The Company has no control over, and assumes no responsibility for,
            the content, privacy policies, or practices of any third party web
            sites or services. You further acknowledge and agree that the
            Company shall not be responsible or liable, directly or indirectly,
            for any damage or loss caused or alleged to be caused by or in
            connection with the use of or reliance on any such content, goods or
            services available on or through any such web sites or services.
          </p>
          <p>
            We strongly advise You to read the Terms and Conditions and Privacy
            Policies of any third-party web sites or services that You visit.
          </p>
          <p className="x-big">Subscription</p>
          <p>
            The services provided in this website may require a subscription
            fee. When this happens, you are required to make payment for the
            service, otherwise you will lose access to the portal. We may
            suspend Your access immediately to the use of the service. Upon
            suspension, Your right to the Service will cease immediately, until
            you have made payment to subscribe to any of our subscription plans.
          </p>
          <p className="x-big">Termination</p>
          <p>
            We may terminate or suspend Your access immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation, if You breach these Terms and Conditions. Upon
            termination, Your right to use our Service will cease immediately,
            until you have paid to use our service.
          </p>
          <p className="x-big">Limitation of Liability</p>
          <p>
            Notwithstanding any damages that You might incur, the entire
            liability of the Company and any of its suppliers under any
            provision of these Terms and Your exclusive remedy for all of the
            foregoing shall be limited to the amount actually paid by You
            through the Service to the maximum extent permitted by applicable
            law, in no event shall the Company or its suppliers be liable for
            any special, incidental, indirect, or consequential damages
            whatsoever (including, but not limited to, damages for loss of
            profits, loss of data or other information, for business
            interruption, for personal injury, loss of privacy arising out of or
            in any way related to the use of or inability to use the Service,
            third-party software and/or third-party hardware used with the
            Service, or otherwise in connection with any provision of this
            Terms), even if the Company or any supplier has been advised of the
            possibility of such damages and even if the remedy fails of its
            essential purpose.
          </p>
          <p className="x-big">"AS IS" and "AS AVAILABLE" Disclaimer</p>
          <p>
            The Service is provided to You "AS IS" and "AS AVAILABLE" and with
            all faults and defects without warranty of any kind. To the maximum
            extent permitted under applicable law, the Company, on its own
            behalf and on behalf of its Affiliates and its partners and their
            respective licensors and service providers, expressly disclaims all
            warranties whether expressed, implied, statutory or otherwise, with
            respect to the Service, including all implied warranties of
            merchantability, fitness for a particular purpose, title and
            non-infringement, and warranties that may arise out of course of
            dealing, course of performance, usage or trade practice. Without
            limitation to the foregoing, the Company provides no warranty or
            undertaking, and makes no representation of any kind that the
            Service will meet Your requirements, achieve any intended results,
            be compatible or work with any other software, applications, systems
            or services, operate without interruption, meet any performance or
            reliability standards or be error free or that any errors or defects
            can or will be corrected.
          </p>
          <p>
            Without limiting the foregoing, neither the Company nor any of the
            company's provider makes any representation or warranty of any kind,
            expressed or implied: (i) as to the operation or availability of the
            Service, or the information, content, and materials or products
            included thereon; (ii) that the Service will be uninterrupted or
            error-free; (iii) as to the accuracy, reliability, or currency of
            any information or content provided through the Service; or (iv)
            that the Service, its servers, the content, or e-mails sent from or
            on behalf of the Company are free of viruses, scripts, trojan
            horses, worms, malware, timebombs or other harmful components.
          </p>
          <p>
            Some jurisdictions do not allow the exclusion of certain types of
            warranties or limitations on applicable statutory rights of a
            consumer, so some or all of the above exclusions and limitations may
            not apply to You. But in such a case, the exclusions and limitations
            set forth in this section shall be applied to the greatest extent
            enforceable under applicable law.
          </p>
          <p className="x-big">Governing Law</p>
          <p>
            The laws of the Country, excluding its conflicts of law rules, shall
            govern these Terms and Your use of the Service. Your use of the
            Application may also be subject to other local, state, national, or
            international laws.
          </p>
          <p className="x-big">Disputes Resolution</p>
          <p>
            If You have any concern or dispute about the Service, You agree to
            first try to resolve the dispute informally by contacting the
            Company.
          </p>
          <p className="x-big">Severability and Waiver</p>
          <p className="big"> Severability</p>
          <p>
            If any provision of these Terms is held to be unenforceable or
            invalid, such provision will be changed and interpreted to
            accomplish the objectives of such provision to the greatest extent
            possible under applicable law and the remaining provisions will
            continue in full force and effect.
          </p>
          <p className="big"> Waiver </p>
          <p>
            Except as provided herein, the failure to exercise a right or to
            require performance of an obligation under these Terms shall not
            effect a party's ability to exercise such right or require such
            performance at any time thereafter nor shall be the waiver of a
            breach constitute a waiver of any subsequent breach.
          </p>
          <p className="x-big">Translation Interpretation</p>
          <p>
            {" "}
            These Terms and Conditions may have been translated if We have made
            them available to You on our Service. You agree that the original
            English text shall prevail in the case of a dispute.
          </p>
          <p className="x-big">Changes to These Terms and Conditions</p>
          <p>
            We reserve the right, at Our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will make
            reasonable efforts to provide at least 15 days' notice prior to any
            new terms taking effect. What constitutes a material change will be
            determined at Our sole discretion.
          </p>
          <p>
            By continuing to access or use Our Service after those revisions
            become effective, You agree to be bound by the revised Terms. If You
            do not agree to the new Terms, in whole or in part, please stop
            using the website and the Service.
          </p>
          <p className="x-big">Contact Us</p>
          If you have any questions about these Terms and Conditions, You can
          contact us:
          <ul>
            <li>By email: hello@studymate.ng</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
});
