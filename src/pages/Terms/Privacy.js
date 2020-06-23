import React, { useContext } from "react";
import "./Terms.scss";
import { motion } from "framer-motion";
import Nav from "../../components/nav/Nav";
import backArrow from "../../assets/images/back.svg";
import { withRouter } from "react-router-dom";
import { userContext } from "../../store/UserContext";

export default withRouter(function Privacy({ history }) {
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
            <img
              src={backArrow}
              height="25"
              className="mr10"
              alt=""
              onClick={back}
              style={{ position: "relative", top: 5, cursor: "pointer" }}
            />
            Privacy Policy
          </span>
        </div>
        <div className="contents">
          <p>
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You. We use Your Personal data to provide and improve the
            Service. By using the Service, You agree to the collection and use
            of information in accordance with this Privacy Policy.
          </p>
          <p className="x-big">Interpretation and Definitions</p>
          <p className="big">Interpretation</p>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural. Definitions
          </p>
          <p>For the purposes of this Privacy Policy:</p>
          <ul>
            <li>
              <b>You</b> means the individual accessing or using the Service, or
              the company, or other legal entity on behalf of which such
              individual is accessing or using the Service, as applicable.
            </li>
            <li>
              <b>Company</b> (referred to as either "the Company", "We", "Us" or
              "Our" in this Agreement) refers to InfoMall Nigeria Limited, 22A
              Prof Kiumi Akingbehin Street, Lekki.
            </li>
            <li>
              <b>Affiliate</b> means an entity that controls, is controlled by
              or is under common control with a party, where "control" means
              ownership of 50% or more of the shares, equity interest or other
              securities entitled to vote for election of directors or other
              managing authority.
            </li>
            <li>
              <b>Account</b> means a unique account created for You to access
              our Service or parts of our Service.
            </li>
            <li>
              <b>Website</b> refers to StudyMATE, accessible from
              www.studymate.ng
            </li>
            <li>
              {" "}
              <b>Service</b> refers to the Website.
            </li>
            <li>
              {" "}
              <b>Country</b> refers to: Nigeria
            </li>
            <li>
              <b>Service Provider</b> means any natural or legal person who
              processes the data on behalf of the Company. It refers to
              third-party companies or individuals employed by the Company to
              facilitate the Service, to provide the Service on behalf of the
              Company, to perform services related to the Service or to assist
              the Company in analyzing how the Service is used.
            </li>
            <li>
              <b>Third-party Social Media Service</b> refers to any website or
              any social network website through which a User can log in or
              create an account to use the Service.
            </li>
            <li>
              <b>Personal Data</b> is any information that relates to an
              identified or identifiable individual.
            </li>
            <li>
              <b>Cookies</b> are small files that are placed on Your computer,
              mobile device or any other device by a website, containing the
              details of Your browsing history on that website among its many
              uses.
            </li>
            <li>
              <b>Device</b> means any device that can access the Service such as
              a computer, a cellphone or a digital tablet.
            </li>
            <li>
              <b>Usage Data</b> refers to data collected automatically, either
              generated by the use of the Service or from the Service
              infrastructure itself (for example, the duration of a page visit).
            </li>
          </ul>
          <p className="x-big">Collecting and Using Your Personal Data</p>
          <p className="big">Types of Data Collected</p>
          <p>Personal Data</p>
          <p>
            While using Our Service, We may ask You to provide Us with certain
            personally identifiable information that can be used to contact or
            identify You. Personally identifiable information may include, but
            is not limited to:
          </p>
          <ul>
            <li>Email address</li>

            <li>First name and last name</li>

            <li>Phone number</li>

            <li>Address, State, Province, ZIP/Postal code, City</li>

            <li>
              Social Media Profiles (including, but not limited to, Facebook,
              Twitter, LinkedIn, Instagram)
            </li>

            <li>Usage Data</li>
          </ul>
          <p className="big">Usage Data</p>
          <p>
            Usage Data is collected automatically when using the Service. Usage
            Data may include information such as Your Device's Internet Protocol
            address (e.g. IP address), browser type, browser version, the pages
            of our Service that You visit, the time and date of Your visit, the
            time spent on those pages, unique device identifiers and other
            diagnostic data. When You access the Service by or through a mobile
            device, We may collect certain information automatically, including,
            but not limited to, the type of mobile device You use, Your mobile
            device unique ID, the IP address of Your mobile device, Your mobile
            operating system, the type of mobile Internet browser You use,
            unique device identifiers and other diagnostic data. We may also
            collect information that Your browser sends whenever You visit our
            Service or when You access the Service by or through a mobile
            device. Tracking Technologies and Cookies
          </p>
          <p>
            We use Cookies and similar tracking technologies to track the
            activity on Our Service and store certain information. Tracking
            technologies used are beacons, tags, and scripts to collect and
            track information and to improve and analyze Our Service. You can
            instruct Your browser to refuse all Cookies or to indicate when a
            Cookie is being sent. However, if You do not accept Cookies, You may
            not be able to use some parts of our Service. Cookies can be
            "Persistent" or "Session" Cookies. Persistent Cookies remain on your
            personal computer or mobile device when You go offline, while
            Session Cookies are deleted as soon as You close your web browser.
          </p>
          <p>
            We use both session and persistent Cookies for the purposes set out
            below:
          </p>
          <ul>
            <li>
              <b>Necessary / Essential Cookies</b> <br />
              Type: Session Cookies Administered by: Us Purpose: These Cookies
              are essential to provide You with services available through the
              Website and to enable You to use some of its features. They help
              to authenticate users and prevent fraudulent use of user accounts.
              Without these Cookies, the services that You have asked for cannot
              be provided, and We only use these Cookies to provide You with
              those services.
            </li>
            <li>
              <b>Cookies Policy / Notice Acceptance Cookies</b> <br />
              Type: Persistent Cookies Administered by: Us Purpose: These
              Cookies identify if users have accepted the use of cookies on the
              Website.
            </li>
            <li>
              <b>Functionality Cookies</b> <br />
              Type: Persistent Cookies Administered by: Us Purpose: These
              Cookies allow us to remember choices You make when You use the
              Website, such as remembering your login details or language
              preference. The purpose of these Cookies is to provide You with a
              more personal experience and to avoid You having to re-enter your
              preferences every time You use the Website.
            </li>
          </ul>
          <p>
            For more information about the cookies we use and your choices
            regarding cookies, please visit our Cookies Policy or the Cookies
            section of our Privacy Policy.
          </p>
          <p className="x-big">Use of Your Personal Data</p>
          <p>The Company may use Personal Data for the following purposes:</p>
          <ul>
            <li>
              To provide and maintain our Service, including to monitor the
              usage of our Service.
            </li>
            <li>
              To manage Your Account: to manage Your registration as a user of
              the Service. The Personal Data You provide can give You access to
              different functionalities of the Service that are available to You
              as a registered user.
            </li>
            <li>
              For the performance of a contract: the development, compliance and
              undertaking of the purchase contract for the products, items or
              services You have purchased or of any other contract with Us
              through the Service.
            </li>
            <li>
              To contact You: To contact You by email, telephone calls, SMS, or
              other equivalent forms of electronic communication, such as a
              mobile application's push notifications regarding updates or
              informative communications related to the functionalities,
              products or contracted services, including the security updates,
              when necessary or reasonable for their implementation.
            </li>
            <li>
              To provide You with news, special offers and general information
              about other goods, services and events which we offer that are
              similar to those that you have already purchased or enquired about
              unless You have opted not to receive such information.
            </li>
            <li>
              To manage Your requests: To attend and manage Your requests to Us.
            </li>
            <p>
              We may share your personal information in the following
              situations:
            </p>
            <li>
              With Service Providers: We may share Your personal information
              with Service Providers to monitor and analyze the use of our
              Service, to contact You.
            </li>
            <li>
              For Business transfers: We may share or transfer Your personal
              information in connection with, or during negotiations of, any
              merger, sale of Company assets, financing, or acquisition of all
              or a portion of our business to another company.
            </li>
            <li>
              With Affiliates: We may share Your information with Our
              affiliates, in which case we will require those affiliates to
              honor this Privacy Policy. Affiliates include Our parent company
              and any other subsidiaries, joint venture partners or other
              companies that We control or that are under common control with
              Us.
            </li>
            <li>
              With Business partners: We may share Your information with Our
              business partners to offer You certain products, services or
              promotions.
            </li>
            <li>
              With other users: when You share personal information or otherwise
              interact in the public areas with other users, such information
              may be viewed by all users and may be publicly distributed
              outside. If You interact with other users or register through a
              Third-Party Social Media Service, Your contacts on the Third-Party
              Social Media Service may see Your name, profile, pictures and
              description of Your activity. Similarly, other users will be able
              to view descriptions of Your activity, communicate with You and
              view Your profile.
            </li>
          </ul>
          <p className="big">Retention of Your Personal Data</p>
          <p>
            The Company will retain Your Personal Data only for as long as is
            necessary for the purposes set out in this Privacy Policy. We will
            retain and use Your Personal Data to the extent necessary to comply
            with our legal obligations (for example, if we are required to
            retain your data to comply with applicable laws), resolve disputes,
            and enforce our legal agreements and policies. The Company will also
            retain Usage Data for internal analysis purposes. Usage Data is
            generally retained for a shorter period of time, except when this
            data is used to strengthen the security or to improve the
            functionality of Our Service, or We are legally obligated to retain
            this data for longer time periods.
          </p>
          <p className="big">Transfer of Your Personal Data</p>
          <p>
            Your information, including Personal Data, is processed at the
            Company's operating offices and in any other places where the
            parties involved in the processing are located. It means that this
            information may be transferred to — and maintained on — computers
            located outside of Your state, province, country or other
            governmental jurisdiction where the data protection laws may differ
            than those from Your jurisdiction. Your consent to this Privacy
            Policy followed by Your submission of such information represents
            Your agreement to that transfer. The Company will take all steps
            reasonably necessary to ensure that Your data is treated securely
            and in accordance with this Privacy Policy and no transfer of Your
            Personal Data will take place to an organization or a country unless
            there are adequate controls in place including the security of Your
            data and other personal information.
          </p>
          <p className="x-big">Disclosure of Your Personal Data</p>
          <p className="big">Business Transactions</p>
          <p>
            If the Company is involved in a merger, acquisition or asset sale,
            Your Personal Data may be transferred. We will provide notice before
            Your Personal Data is transferred and becomes subject to a different
            Privacy Policy.
          </p>
          <p className="big">Law enforcement</p>
          <p>
            Under certain circumstances, the Company may be required to disclose
            Your Personal Data if required to do so by law or in response to
            valid requests by public authorities (e.g. a court or a government
            agency).
          </p>
          <p className="big">Other legal requirements</p>
          <p>
            The Company may disclose Your Personal Data in the good faith belief
            that such action is necessary to:
          </p>
          <li>Comply with a legal obligation</li>
          <li>Protect and defend the rights or property of the Company</li>
          <li>
            Prevent or investigate possible wrongdoing in connection with the
            Service
          </li>
          <li>
            Protect the personal safety of Users of the Service or the public
          </li>
          <li>Protect against legal liability</li>
          <p className="x-big">Security of Your Personal Data</p>
          <p>
            The security of Your Personal Data is important to Us, but remember
            that no method of transmission over the Internet, or method of
            electronic storage is 100% secure. While We strive to use
            commercially acceptable means to protect Your Personal Data, We
            cannot guarantee its absolute security.
          </p>
          <p className="x-big">Links to Other Websites</p>
          <p>
            Our Service may contain links to other websites that are not
            operated by Us. If You click on a third party link, You will be
            directed to that third party's site. We strongly advise You to
            review the Privacy Policy of every site You visit. We have no
            control over and assume no responsibility for the content, privacy
            policies or practices of any third party sites or services.
          </p>
          <p className="x-big">Changes to this Privacy Policy</p>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            You of any changes by posting the new Privacy Policy on this page.
          </p>
          <p>
            We will let You know via email and/or a prominent notice on Our
            Service, prior to the change becoming effective and update the "Last
            updated" date at the top of this Privacy Policy.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
          <p className="x-big">Contact Us</p>
          <p>
            If you have any questions about this Privacy Policy, You can contact
            us:
          </p>
          <li>By email: hello@studymate.ng</li>
        </div>
      </div>
    </motion.div>
  );
});
