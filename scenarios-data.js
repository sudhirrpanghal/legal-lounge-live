// Decision Room Scenario Bank (105 Realistic Practice Scenarios)
window.DECISION_SCENARIOS = [
  {
    "type": "CRIMINAL / ARREST",
    "title": "Police arrest a citizen without a warrant for an offence carrying up to 3 years imprisonment.",
    "text": "A person was accused of simple theft under Section 379 IPC / Section 303(2) BNS. The police arrived at his residence and immediately handcuffed and arrested him without recording any reasons in writing or issuing a notice.",
    "q": "Did the police follow the statutory requirements established under Section 41 CrPC / Section 35 BNSS and the Arnesh Kumar guidelines?",
    "o": [
      {
        "t": "No. For offences punishable with up to 7 years imprisonment, arrest is not automatic. The police must record reasons in writing and ordinarily issue a notice of appearance unless specific necessity criteria are met.",
        "ok": true,
        "f": "Correct. Under Section 41(1)(b) CrPC / Section 35(1)(b) BNSS and the Supreme Court judgment in Arnesh Kumar v. State of Bihar (2014), police cannot arrest routinely for offences punishable with up to 7 years. They must record why arrest is necessary (e.g. to prevent tampering or absconding) or issue a notice of appearance."
      },
      {
        "t": "Yes. Police have unrestricted power to arrest any person named in an FIR without recording reasons.",
        "f": "Incorrect. Routine arrests violate Article 21. Section 41 CrPC and Section 35 BNSS strictly circumscribe arrest powers for offences carrying up to 7 years."
      },
      {
        "t": "The police only need to issue a notice if the accused explicitly demands one in writing beforehand.",
        "f": "Incorrect. The statutory obligation to assess necessity and issue a notice rests entirely upon the investigating officer."
      }
    ]
  },
  {
    "type": "CRIMINAL / BAIL",
    "title": "Station house officer refuses bail to an accused arrested for a bailable offence.",
    "text": "A motorist was arrested for rash driving under Section 279 IPC / Section 281 BNS, which is classified as bailable in the First Schedule. The accused produced a local surety and offered personal bond, but the SHO refused bail citing ongoing investigation.",
    "q": "Can the police officer refuse bail for an offence designated as bailable?",
    "o": [
      {
        "t": "No. Under Section 436 CrPC / Section 478 BNSS, bail in bailable offences is an absolute statutory right, and the officer is legally mandated to release the accused on furnishing surety or bond.",
        "ok": true,
        "f": "Correct. For bailable offences, the police officer has no discretion to refuse bail once the accused is prepared to furnish bond. Denying bail in a bailable offence amounts to illegal detention."
      },
      {
        "t": "Yes. The SHO can hold any accused in custody for 24 hours at their sole discretion regardless of whether the offence is bailable.",
        "f": "Incorrect. Section 436 CrPC / Section 478 BNSS uses the mandatory word “shall be released on bail”. Refusal is unlawful."
      },
      {
        "t": "Bail can only ever be granted by a Judicial Magistrate, never by a police officer.",
        "f": "Incorrect. Police officers in charge of a station have statutory authority to grant station bail for bailable offences."
      }
    ]
  },
  {
    "type": "CRIMINAL / INVESTIGATION",
    "title": "Police station refuses to register an FIR because the crime occurred in another district.",
    "text": "A woman who was robbed while traveling on a highway arrived at the nearest police station in a neighbouring district. The duty officer turned her away, stating that she must travel to the police station having territorial jurisdiction over the exact highway milepost.",
    "q": "What is the duty of the police station regarding registration of a Zero FIR?",
    "o": [
      {
        "t": "The police station must immediately register a “Zero FIR”, initiate preliminary steps to secure evidence, and transfer the case to the jurisdictional police station.",
        "ok": true,
        "f": "Correct. Under the Supreme Court ruling in Lalita Kumari (2014) and explicitly codified in Section 173(1) BNSS, a police station cannot refuse information of a cognizable offence. A Zero FIR must be registered irrespective of jurisdiction and transferred subsequently."
      },
      {
        "t": "The police station is legally prohibited from registering any complaint for crimes committed outside its territorial limits.",
        "f": "Incorrect. The concept of Zero FIR was created specifically to eliminate territorial excuses when reporting cognizable crimes."
      },
      {
        "t": "The victim must first petition the High Court under Article 226 before any out-of-district police station can accept the complaint.",
        "f": "Incorrect. No high court petition is required; police refusal violates Section 154 CrPC / Section 173 BNSS."
      }
    ]
  },
  {
    "type": "CRIMINAL / DETENTION",
    "title": "Police detain an accused for 36 hours without producing him before a Magistrate.",
    "text": "An individual was arrested on Friday evening at 6:00 PM and kept in police lockup until Sunday morning at 8:00 AM before being presented before the duty magistrate, without any magistrate order authorizing detention.",
    "q": "Does this detention violate constitutional and statutory limits?",
    "o": [
      {
        "t": "Yes. Under Article 22(2) of the Constitution and Section 57 CrPC / Section 58 BNSS, an arrested person must be produced before the nearest magistrate within 24 hours of arrest, excluding journey time.",
        "ok": true,
        "f": "Correct. The 24-hour rule is a non-negotiable constitutional guarantee under Article 22(2) and Section 57 CrPC / Section 58 BNSS. Detention beyond 24 hours without a magistrate’s order is illegal confinement."
      },
      {
        "t": "No. Weekends and gazetted holidays automatically extend the permissible police detention period to 48 hours.",
        "f": "Incorrect. Holidays do not suspend the 24-hour rule; duty magistrates and remand courts operate specifically to hear remand matters on holidays."
      },
      {
        "t": "Police may hold an accused for up to 72 hours if the investigation is complex.",
        "f": "Incorrect. Only a magistrate can authorize further remand beyond 24 hours under Section 167 CrPC / Section 187 BNSS."
      }
    ]
  },
  {
    "type": "CRIMINAL / SEARCH",
    "title": "Police conduct a warrantless house search without independent witnesses.",
    "text": "During a theft investigation, police entered a residential home at night without a search warrant and conducted a search without calling any neighbours or local residents to witness the search or sign the seizure list.",
    "q": "What procedural safeguard is mandated for searches of closed premises under Section 100 CrPC / Section 103 BNSS?",
    "o": [
      {
        "t": "The officer must call upon two or more independent and respectable inhabitants of the locality to attend and witness the search, and prepare a seizure memo signed by them.",
        "ok": true,
        "f": "Correct. Section 100(4) CrPC / Section 103 BNSS requires searches of closed places to be made in the presence of independent local witnesses, and BNSS Section 105 now mandates audio-video electronic recording of searches and seizures."
      },
      {
        "t": "Police searches never require independent witnesses as long as at least three police constables are present.",
        "f": "Incorrect. Police personnel cannot substitute for independent local witnesses mandated by statute to prevent fabricated seizures."
      },
      {
        "t": "Independent witnesses are only required if the homeowner pays a fee to the magistrate.",
        "f": "Incorrect. Witnessing searches is a public statutory duty without any fees."
      }
    ]
  },
  {
    "type": "CRIMINAL / WOMEN RIGHTS",
    "title": "A woman is arrested by male officers after sunset.",
    "text": "At 8:30 PM, a team consisting solely of male police officers arrived at a woman’s house and arrested her in connection with an alleged cheating offence.",
    "q": "What is the law regarding the arrest of women after sunset under Section 46(4) CrPC / Section 43(5) BNSS?",
    "o": [
      {
        "t": "Except in exceptional circumstances, no woman shall be arrested after sunset and before sunrise, and where exceptional circumstances exist, the arrest must be made by a woman police officer with prior written permission of the Judicial Magistrate First Class.",
        "ok": true,
        "f": "Correct. Section 46(4) CrPC / Section 43(5) BNSS strictly prohibits arresting women between sunset and sunrise except under exceptional circumstances with prior permission from a Judicial Magistrate First Class obtained by a woman police officer."
      },
      {
        "t": "Male officers can arrest a woman at any hour of the night if accompanied by any neighbour.",
        "f": "Incorrect. The statute explicitly requires a woman police officer and prior judicial permission."
      },
      {
        "t": "The restriction on nighttime arrest only applies to murder cases, not economic offences.",
        "f": "Incorrect. The protection applies generally to all offences."
      }
    ]
  },
  {
    "type": "CRIMINAL / ANTICIPATORY BAIL",
    "title": "An accused seeks anticipatory bail after a regular chargesheet has been filed.",
    "text": "A business executive learns that an FIR and subsequent chargesheet have been filed against him alleging breach of trust. He files an application for anticipatory bail under Section 438 CrPC / Section 482 BNSS before the Sessions Court.",
    "q": "Can anticipatory bail be granted after a chargesheet is filed or does it expire upon filing of chargesheet?",
    "o": [
      {
        "t": "Anticipatory bail can be granted even after filing of the chargesheet, and ordinarily continues until the conclusion of the trial unless limited by specific court conditions.",
        "ok": true,
        "f": "Correct. A 5-judge Constitution Bench in Sushila Aggarwal v. State (NCT of Delhi) (2020) settled that anticipatory bail does not automatically expire upon chargesheet filing and can continue throughout the trial."
      },
      {
        "t": "Anticipatory bail is strictly prohibited once an FIR has been investigated and chargesheet filed.",
        "f": "Incorrect. Apprehension of arrest can arise even after chargesheet when court issues non-bailable warrants."
      },
      {
        "t": "Anticipatory bail can only last for a maximum of 14 days under all circumstances.",
        "f": "Incorrect. There is no rigid 14-day statutory cap; the Constitution Bench confirmed it can operate till end of trial."
      }
    ]
  },
  {
    "type": "CRIMINAL / DEFAULT BAIL",
    "title": "Investigation is not completed within 90 days for a serious offence.",
    "text": "An accused has been in judicial custody for 90 days in an offence punishable with up to 10 years imprisonment. On day 91, the police have not filed the chargesheet. The accused applies for bail.",
    "q": "What is the accused’s right under Section 167(2) CrPC / Section 187 BNSS (Default Bail)?",
    "o": [
      {
        "t": "The accused acquires an indefeasible right to default bail upon the expiry of 90 days, provided he is prepared to furnish bail, and subsequent filing of chargesheet cannot defeat this right.",
        "ok": true,
        "f": "Correct. As held in Bikramjit Singh v. State of Punjab and M. Ravindran v. Directorate of Revenue Intelligence, the right to default bail under Section 167(2) CrPC / Section 187 BNSS is an indefeasible fundamental right flowing from Article 21."
      },
      {
        "t": "The court must grant the police an automatic 30-day extension before considering any bail application.",
        "f": "Incorrect. Statutory time limits (60 or 90 days) are strict, except under special statutes like UAPA where formal extension applications are required."
      },
      {
        "t": "Default bail only applies if the accused proves his total innocence at that stage.",
        "f": "Incorrect. Default bail is granted solely due to the failure of prosecution to file chargesheet in time, without touching merits of evidence."
      }
    ]
  },
  {
    "type": "CRIMINAL / CONFESSION",
    "title": "Police record an oral confession while the accused is in lockup.",
    "text": "While in police custody, an accused confesses to committing a burglary. The police officer writes down the statement and seeks to introduce it in trial as direct proof of guilt.",
    "q": "Is a confession made to a police officer admissible as substantive evidence under Section 25 IEA / Section 23(1) BSA?",
    "o": [
      {
        "t": "No. A confession made to a police officer is completely inadmissible against the accused; only information distinctly leading to the discovery of a fact/material object is admissible under Section 27 IEA / Section 23(2) BSA.",
        "ok": true,
        "f": "Correct. Section 25 Indian Evidence Act / Section 23(1) Bharatiya Sakshya Adhiniyam creates an absolute statutory bar against proving confessions made to police officers. Only the recovery of physical evidence pursuant to a disclosure statement is admissible."
      },
      {
        "t": "Yes. Any oral confession recorded in the police station diary is conclusive proof of guilt.",
        "f": "Incorrect. Custodial confessions to police are barred by law due to danger of coercion."
      },
      {
        "t": "It is admissible only if signed by the accused in red ink.",
        "f": "Incorrect. Section 162 CrPC / Section 181 BNSS prohibits police from requiring signatures on investigation statements, and confessions to police remain inadmissible."
      }
    ]
  },
  {
    "type": "CRIMINAL / POLICE REMAND",
    "title": "Police seek 15 days of police custody in parts under the new BNSS provisions.",
    "text": "Under Section 187 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), police seek custody of an accused for 7 days initially, and then seek the remaining 8 days of police custody during the second month of judicial custody.",
    "q": "How does BNSS Section 187 alter the former 15-day police remand rule under Section 167 CrPC?",
    "o": [
      {
        "t": "Under BNSS Section 187, the 15-day police custody can be taken in whole or in parts during the first 40 or 60 days of the total detention period, unlike the former rule requiring it strictly in the first 15 days.",
        "ok": true,
        "f": "Correct. Under former Section 167 CrPC (per CBI v. Anupam Kulkarni), police remand was restricted to the initial 15 days after arrest. Section 187 BNSS now permits police custody up to 15 days in parts across the initial 40 or 60 days of detention."
      },
      {
        "t": "BNSS abolishes police custody entirely and permits only judicial custody.",
        "f": "Incorrect. Police custody is retained but its scheduling across the 40/60-day window has been made flexible."
      },
      {
        "t": "Police can now keep an accused in police station lockup for 90 consecutive days.",
        "f": "Incorrect. The maximum aggregate duration of police custody remains capped at 15 days."
      }
    ]
  },
  {
    "type": "CONSTITUTIONAL / SPEECH",
    "title": "Student arrested for posting political satire online.",
    "text": "A university student posted a satirical cartoon criticizing a state chief minister’s infrastructure policy. The local police registered a case alleging public mischief and incitement under Section 505 IPC / Section 353 BNS.",
    "q": "Does peaceful criticism and satire enjoy constitutional protection under Article 19(1)(a)?",
    "o": [
      {
        "t": "Yes. Article 19(1)(a) protects dissent, satire, and criticism of government policy. In Shreya Singhal (2015) and Kedar Nath Singh (1962), the Supreme Court affirmed that advocacy or criticism does not amount to an offence unless there is imminent incitement to violence.",
        "ok": true,
        "f": "Correct decision. Yes. Article 19(1)(a) protects dissent, satire, and criticism of government policy. In Shreya Singhal (2015) and Kedar Nath Singh (1962), the Supreme Court affirmed that advocacy or criticism does not amount to an offence unless there is imminent incitement to violence."
      },
      {
        "t": "No. The Constitution forbids citizens from criticizing elected public officials.",
        "f": "Incorrect legal path. No. The Constitution forbids citizens from criticizing elected public officials."
      },
      {
        "t": "Satirical cartoons are categorized as hate speech under all circumstances.",
        "f": "Incorrect legal path. Satirical cartoons are categorized as hate speech under all circumstances."
      }
    ]
  },
  {
    "type": "CONSTITUTIONAL / PRIVACY",
    "title": "State agency seeks phone tapping without home ministry authorization.",
    "text": "A tax investigation wing intercepted a chartered accountant’s phone calls based on an internal memo signed by an assistant commissioner without authorization from the Union or State Home Secretary.",
    "q": "What is the legal procedure required for telephone interception under Section 5(2) of the Indian Telegraph Act and the PUCL judgment?",
    "o": [
      {
        "t": "Interception orders can only be issued by the Union Home Secretary or State Home Secretary upon recorded reasons showing public emergency or interest of public safety; unauthorized tapping violates Article 21.",
        "ok": true,
        "f": "Correct decision. Interception orders can only be issued by the Union Home Secretary or State Home Secretary upon recorded reasons showing public emergency or interest of public safety; unauthorized tapping violates Article 21."
      },
      {
        "t": "Any police sub-inspector or tax inspector can tap phones without higher approval.",
        "f": "Incorrect legal path. Any police sub-inspector or tax inspector can tap phones without higher approval."
      },
      {
        "t": "Telephone conversations have zero constitutional expectation of privacy in India.",
        "f": "Incorrect legal path. Telephone conversations have zero constitutional expectation of privacy in India."
      }
    ]
  },
  {
    "type": "CONSTITUTIONAL / WRITS",
    "title": "A state authority refuses to release a lawfully seized vehicle after acquittal.",
    "text": "A commercial truck owner was acquitted of transport violations, but the regional transport officer refused to release the vehicle despite repeated certified applications.",
    "q": "Which constitutional writ can be sought before the High Court under Article 226?",
    "o": [
      {
        "t": "A writ of Mandamus to compel the public official to perform the mandatory statutory duty of releasing the vehicle.",
        "ok": true,
        "f": "Correct decision. A writ of Mandamus to compel the public official to perform the mandatory statutory duty of releasing the vehicle."
      },
      {
        "t": "A writ of Quo Warranto to challenge the truck owner’s driving license.",
        "f": "Incorrect legal path. A writ of Quo Warranto to challenge the truck owner’s driving license."
      },
      {
        "t": "A writ of Habeas Corpus to release the truck.",
        "f": "Incorrect legal path. A writ of Habeas Corpus to release the truck."
      }
    ]
  },
  {
    "type": "CONSTITUTIONAL / ILLEGAL DETENTION",
    "title": "Police detain a witness for 4 days in an undisclosed guest house.",
    "text": "To compel a suspect to surrender, police picked up his elder brother (who is not an accused) and kept him confined in a guest house for 4 days without producing him in court.",
    "q": "What is the appropriate emergency legal remedy for the family?",
    "o": [
      {
        "t": "Filing a writ petition for Habeas Corpus under Article 226 before the High Court or Article 32 before the Supreme Court seeking immediate production and release of the detainee.",
        "ok": true,
        "f": "Correct decision. Filing a writ petition for Habeas Corpus under Article 226 before the High Court or Article 32 before the Supreme Court seeking immediate production and release of the detainee."
      },
      {
        "t": "Sending an email to the police station and waiting 90 days for a response.",
        "f": "Incorrect legal path. Sending an email to the police station and waiting 90 days for a response."
      },
      {
        "t": "Filing a civil suit for recovery of money in the district court.",
        "f": "Incorrect legal path. Filing a civil suit for recovery of money in the district court."
      }
    ]
  },
  {
    "type": "CHEQUE BOUNCE / NI ACT",
    "title": "Cheque dishonoured due to insufficient funds: Notice timeline.",
    "text": "A supplier received a cheque of ₹5,00,000 which was dishonoured with the remark “Funds Insufficient”. The supplier waited 45 days after receiving the return memo before sending a legal demand notice to the drawer.",
    "q": "Did the supplier comply with the statutory timeline under Section 138 of the Negotiable Instruments Act?",
    "o": [
      {
        "t": "No. Section 138(b) mandates that the demand notice must be issued within 30 days of receiving information of dishonour from the bank; sending notice on day 45 is time-barred unless delay is condoned under Section 142.",
        "ok": true,
        "f": "Correct decision. No. Section 138(b) mandates that the demand notice must be issued within 30 days of receiving information of dishonour from the bank; sending notice on day 45 is time-barred unless delay is condoned under Section 142."
      },
      {
        "t": "Yes. The payee has up to 3 years of general limitation to send the initial cheque bounce notice.",
        "f": "Incorrect legal path. Yes. The payee has up to 3 years of general limitation to send the initial cheque bounce notice."
      },
      {
        "t": "The notice is unnecessary; the payee can immediately file an FIR for robbery.",
        "f": "Incorrect legal path. The notice is unnecessary; the payee can immediately file an FIR for robbery."
      }
    ]
  },
  {
    "type": "CHEQUE BOUNCE / NOTICE",
    "title": "Drawer receives Section 138 notice: Window to make payment.",
    "text": "A business received a statutory legal notice demanding payment for a bounced cheque of ₹2,00,000. The notice was delivered on October 1st.",
    "q": "How many days does the drawer have to make payment before a criminal cause of action arises?",
    "o": [
      {
        "t": "15 days from the date of receipt of notice. If payment is made within 15 days, no offence is committed under Section 138.",
        "ok": true,
        "f": "Correct decision. 15 days from the date of receipt of notice. If payment is made within 15 days, no offence is committed under Section 138."
      },
      {
        "t": "The drawer must pay within 24 hours or face automatic non-bailable arrest.",
        "f": "Incorrect legal path. The drawer must pay within 24 hours or face automatic non-bailable arrest."
      },
      {
        "t": "The drawer has 6 months to pay without any legal consequence.",
        "f": "Incorrect legal path. The drawer has 6 months to pay without any legal consequence."
      }
    ]
  },
  {
    "type": "CHEQUE BOUNCE / DEFENCE",
    "title": "Cheque given as a security deposit for an unperformed contract.",
    "text": "A contractor gave a blank security cheque before commencing a construction project. The client encashed it before any dispute or work started, and then filed a Section 138 complaint when it bounced.",
    "q": "Can an accused successfully rebut the presumption under Section 139 NI Act?",
    "o": [
      {
        "t": "Yes. The accused can rebut the presumption by establishing on a preponderance of probabilities that on the date the cheque was presented, there was no existing legally enforceable debt or liability.",
        "ok": true,
        "f": "Correct decision. Yes. The accused can rebut the presumption by establishing on a preponderance of probabilities that on the date the cheque was presented, there was no existing legally enforceable debt or liability."
      },
      {
        "t": "No. The presumption under Section 139 is conclusive proof and can never be disproved in trial.",
        "f": "Incorrect legal path. No. The presumption under Section 139 is conclusive proof and can never be disproved in trial."
      },
      {
        "t": "Security cheques are exempt from all banking laws and cannot be presented.",
        "f": "Incorrect legal path. Security cheques are exempt from all banking laws and cannot be presented."
      }
    ]
  },
  {
    "type": "CONTRACTS / FREELANCING",
    "title": "Client withholds final payment after approving project deliverables.",
    "text": "A software engineer delivered an application per specification, approved via email. The client then introduced new feature requests and refused to pay the final 40% milestone invoice.",
    "q": "What is the legal standing of the developer’s claim?",
    "o": [
      {
        "t": "The developer has a valid claim for the unpaid sum. Approved deliverables complete the contract scope; unilateral addition of new requirements without agreement cannot justify withholding payment for completed work.",
        "ok": true,
        "f": "Correct decision. The developer has a valid claim for the unpaid sum. Approved deliverables complete the contract scope; unilateral addition of new requirements without agreement cannot justify withholding payment for completed work."
      },
      {
        "t": "The client has unlimited right to demand free revisions indefinitely on any software project.",
        "f": "Incorrect legal path. The client has unlimited right to demand free revisions indefinitely on any software project."
      },
      {
        "t": "Freelance agreements are non-binding unless executed on ₹500 stamp paper with two gazetted witnesses.",
        "f": "Incorrect legal path. Freelance agreements are non-binding unless executed on ₹500 stamp paper with two gazetted witnesses."
      }
    ]
  },
  {
    "type": "CONTRACTS / NON-COMPETE",
    "title": "Post-employment non-compete clause prohibiting employment for 2 years.",
    "text": "A software developer resigned from a company. The employment agreement contained a clause barring her from working for any competitor anywhere in India for 2 years after leaving.",
    "q": "Is this post-employment non-compete restriction enforceable under Indian contract law?",
    "o": [
      {
        "t": "No. Under Section 27 of the Indian Contract Act, 1872, agreements in restraint of trade are void to that extent. Post-termination non-compete covenants are generally void as held in Percept D’Mark and Superintendence Company.",
        "ok": true,
        "f": "Correct decision. No. Under Section 27 of the Indian Contract Act, 1872, agreements in restraint of trade are void to that extent. Post-termination non-compete covenants are generally void as held in Percept D’Mark and Superintendence Company."
      },
      {
        "t": "Yes. Every clause in an employment agreement is enforceable regardless of restraint of trade.",
        "f": "Incorrect legal path. Yes. Every clause in an employment agreement is enforceable regardless of restraint of trade."
      },
      {
        "t": "Non-compete clauses are only void if the employee is below 18 years of age.",
        "f": "Incorrect legal path. Non-compete clauses are only void if the employee is below 18 years of age."
      }
    ]
  },
  {
    "type": "CONTRACTS / BREACH",
    "title": "Vendor cancels supply contract due to price fluctuation.",
    "text": "A cement manufacturer agreed to supply 1,000 bags at ₹350/bag. Due to raw material cost increases, the manufacturer cancelled the agreement, claiming frustration of contract under Section 56.",
    "q": "Does commercial difficulty or price fluctuation constitute contract frustration under Section 56?",
    "o": [
      {
        "t": "No. As settled in Satyabrata Ghose v. Mugneeram Bangur and Energy Watchdog v. CERC, mere commercial difficulty, economic unprofitability, or price escalation does not frustrate a contract.",
        "ok": true,
        "f": "Correct decision. No. As settled in Satyabrata Ghose v. Mugneeram Bangur and Energy Watchdog v. CERC, mere commercial difficulty, economic unprofitability, or price escalation does not frustrate a contract."
      },
      {
        "t": "Yes. Any increase in market price automatically discharges all supply contracts.",
        "f": "Incorrect legal path. Yes. Any increase in market price automatically discharges all supply contracts."
      },
      {
        "t": "The vendor can unilaterally cancel and demand compensation from the buyer.",
        "f": "Incorrect legal path. The vendor can unilaterally cancel and demand compensation from the buyer."
      }
    ]
  },
  {
    "type": "CYBER / DEEPFAKE",
    "title": "Circulation of sexually explicit deepfake video on messaging apps.",
    "text": "A fabricated AI-generated non-consensual deepfake video of a college student was circulated in WhatsApp groups and social media.",
    "q": "Under which key statutory provisions can the perpetrator be prosecuted?",
    "o": [
      {
        "t": "Sections 66E (privacy violation), 67, and 67A (publishing sexually explicit material) of the IT Act, 2000, along with defamation and sexual harassment under BNS / IPC.",
        "ok": true,
        "f": "Correct decision. Sections 66E (privacy violation), 67, and 67A (publishing sexually explicit material) of the IT Act, 2000, along with defamation and sexual harassment under BNS / IPC."
      },
      {
        "t": "Deepfakes are classified as creative art and are fully immune from criminal law.",
        "f": "Incorrect legal path. Deepfakes are classified as creative art and are fully immune from criminal law."
      },
      {
        "t": "Only the internet service provider can be prosecuted, not the creator or distributor.",
        "f": "Incorrect legal path. Only the internet service provider can be prosecuted, not the creator or distributor."
      }
    ]
  },
  {
    "type": "CYBER / DIGITAL EVIDENCE",
    "title": "Producing WhatsApp chat printouts in court without a Section 65B / Section 63 certificate.",
    "text": "A complainant brought paper printouts of WhatsApp messages to court as secondary evidence of an agreement, but failed to produce a certificate from the device custodian.",
    "q": "Can electronic record printouts be admitted without the statutory certificate?",
    "o": [
      {
        "t": "No. Per the Supreme Court judgment in Arjun Panditrao Khotkar (2020) and Section 63 BSA, secondary evidence of electronic records is strictly inadmissible without the mandatory certificate.",
        "ok": true,
        "f": "Correct decision. No. Per the Supreme Court judgment in Arjun Panditrao Khotkar (2020) and Section 63 BSA, secondary evidence of electronic records is strictly inadmissible without the mandatory certificate."
      },
      {
        "t": "Yes. Colour printouts of WhatsApp chats are self-authenticating primary evidence without any certificate.",
        "f": "Incorrect legal path. Yes. Colour printouts of WhatsApp chats are self-authenticating primary evidence without any certificate."
      },
      {
        "t": "The certificate is only required if the messages were in a foreign language.",
        "f": "Incorrect legal path. The certificate is only required if the messages were in a foreign language."
      }
    ]
  },
  {
    "type": "CYBER / IDENTITY THEFT",
    "title": "Fraudster creates fake social media profile using someone else’s photo and name to solicit funds.",
    "text": "An imposter created a Facebook profile using a doctor’s photos and credentials, messaging contacts requesting urgent medical emergency loans.",
    "q": "Which specific offence under the Information Technology Act is attracted?",
    "o": [
      {
        "t": "Section 66D of the IT Act, 2000 (cheating by personation by using computer resource), carrying imprisonment up to 3 years and fine.",
        "ok": true,
        "f": "Correct decision. Section 66D of the IT Act, 2000 (cheating by personation by using computer resource), carrying imprisonment up to 3 years and fine."
      },
      {
        "t": "Section 43A of the IT Act only (civil damages against the platform).",
        "f": "Incorrect legal path. Section 43A of the IT Act only (civil damages against the platform)."
      },
      {
        "t": "No crime is committed unless the real doctor personally knows the imposter.",
        "f": "Incorrect legal path. No crime is committed unless the real doctor personally knows the imposter."
      }
    ]
  },
  {
    "type": "CONSUMER / E-COMMERCE",
    "title": "E-commerce platform delivers a counterfeit smartphone and refuses return.",
    "text": "A buyer purchased a premium branded smartphone from a verified seller on an e-commerce marketplace. The received product was counterfeit. The platform refused return citing “seller warranty only”.",
    "q": "What is the liability of the e-commerce marketplace under the Consumer Protection (E-Commerce) Rules, 2020?",
    "o": [
      {
        "t": "The platform cannot escape liability; e-commerce entities must provide a grievance redressal mechanism, accept returns for counterfeit goods, and can be held liable for unfair trade practice.",
        "ok": true,
        "f": "Correct decision. The platform cannot escape liability; e-commerce entities must provide a grievance redressal mechanism, accept returns for counterfeit goods, and can be held liable for unfair trade practice."
      },
      {
        "t": "E-commerce platforms have absolute immunity as intermediaries and are never liable for counterfeit deliveries.",
        "f": "Incorrect legal path. E-commerce platforms have absolute immunity as intermediaries and are never liable for counterfeit deliveries."
      },
      {
        "t": "The consumer can only seek compensation if the phone exploded.",
        "f": "Incorrect legal path. The consumer can only seek compensation if the phone exploded."
      }
    ]
  },
  {
    "type": "CONSUMER / DEFICIENCY",
    "title": "Hospital charges ₹50,000 for emergency ambulance and withholds deceased patient’s body.",
    "text": "A private hospital demanded arbitrary inflated charges and refused to hand over the body of a deceased patient to the family until the entire disputed bill was cleared.",
    "q": "Is withholding a dead body for hospital bill clearance lawful under consumer law and human rights jurisprudence?",
    "o": [
      {
        "t": "No. The High Courts and consumer commissions have repeatedly ruled that withholding a dead body is unlawful, inhuman, and a gross deficiency in service, violating the dignity of the deceased under Article 21.",
        "ok": true,
        "f": "Correct decision. No. The High Courts and consumer commissions have repeatedly ruled that withholding a dead body is unlawful, inhuman, and a gross deficiency in service, violating the dignity of the deceased under Article 21."
      },
      {
        "t": "Yes. Hospitals have a possessory lien on human bodies under the Sale of Goods Act.",
        "f": "Incorrect legal path. Yes. Hospitals have a possessory lien on human bodies under the Sale of Goods Act."
      },
      {
        "t": "Hospitals can hold a body for up to 30 days pending payment.",
        "f": "Incorrect legal path. Hospitals can hold a body for up to 30 days pending payment."
      }
    ]
  },
  {
    "type": "EMPLOYMENT / POSH",
    "title": "Workplace sexual harassment: Company lacks Internal Committee (IC).",
    "text": "A corporate firm with 45 employees received a sexual harassment complaint from an employee. The management had never constituted an Internal Committee (IC) under the POSH Act.",
    "q": "What are the legal consequences for the employer under the POSH Act, 2013?",
    "o": [
      {
        "t": "Failure to constitute an Internal Committee is a statutory violation punishable with a fine of up to ₹50,000, and repeated violation can lead to cancellation of business license or registration.",
        "ok": true,
        "f": "Correct decision. Failure to constitute an Internal Committee is a statutory violation punishable with a fine of up to ₹50,000, and repeated violation can lead to cancellation of business license or registration."
      },
      {
        "t": "The POSH Act only applies to government offices with over 500 employees.",
        "f": "Incorrect legal path. The POSH Act only applies to government offices with over 500 employees."
      },
      {
        "t": "The employer is exempted from POSH requirements if an HR manager is present.",
        "f": "Incorrect legal path. The employer is exempted from POSH requirements if an HR manager is present."
      }
    ]
  },
  {
    "type": "EMPLOYMENT / GRATUITY",
    "title": "Employer withholds gratuity after employee completes 6 years of continuous service.",
    "text": "An employee resigned after 6 years of continuous service. The employer withheld his statutory gratuity, claiming that the resignation was inconvenient to the company.",
    "q": "Under the Payment of Gratuity Act, 1972, can gratuity be forfeited on grounds of voluntary resignation?",
    "o": [
      {
        "t": "No. An employee completing 5 years of continuous service is entitled to gratuity on resignation; forfeiture is only permissible in cases of termination for riotous/disorderly conduct or acts causing financial loss.",
        "ok": true,
        "f": "Correct decision. No. An employee completing 5 years of continuous service is entitled to gratuity on resignation; forfeiture is only permissible in cases of termination for riotous/disorderly conduct or acts causing financial loss."
      },
      {
        "t": "Yes. Employers have absolute discretion to cancel gratuity upon resignation.",
        "f": "Incorrect legal path. Yes. Employers have absolute discretion to cancel gratuity upon resignation."
      },
      {
        "t": "Gratuity is only mandatory after 25 years of service.",
        "f": "Incorrect legal path. Gratuity is only mandatory after 25 years of service."
      }
    ]
  },
  {
    "type": "PROPERTY / TENANCY",
    "title": "Landlord changes front door lock and cuts electricity to force tenant out.",
    "text": "A residential tenant was 15 days late on rent. While the tenant was at work, the landlord disconnected the electricity, water supply, and changed the door lock without any court order.",
    "q": "Is extra-judicial eviction and cutting essential services lawful?",
    "o": [
      {
        "t": "No. Eviction can only be done through due process of law. Cutting essential services (water/electricity) is prohibited under state rent control laws, and illegal dispossession can be restrained by injunction.",
        "ok": true,
        "f": "Correct decision. No. Eviction can only be done through due process of law. Cutting essential services (water/electricity) is prohibited under state rent control laws, and illegal dispossession can be restrained by injunction."
      },
      {
        "t": "Yes. Landlords possess sovereign right to disconnect utilities whenever rent is delayed by even one day.",
        "f": "Incorrect legal path. Yes. Landlords possess sovereign right to disconnect utilities whenever rent is delayed by even one day."
      },
      {
        "t": "The landlord’s ownership title gives him legal authority to bypass civil courts entirely.",
        "f": "Incorrect legal path. The landlord’s ownership title gives him legal authority to bypass civil courts entirely."
      }
    ]
  },
  {
    "type": "PROPERTY / SUCCESSION",
    "title": "Daughter’s right in ancestral Hindu coparcenary property.",
    "text": "A father died intestate in 2022 leaving ancestral farmland. His son claimed the entire property, asserting that the married daughter has no share in ancestral property.",
    "q": "What is the daughter’s legal right under the Hindu Succession (Amendment) Act, 2005 and Vineeta Sharma v. Rakesh Sharma?",
    "o": [
      {
        "t": "Under the 2005 Amendment and the Supreme Court judgment in Vineeta Sharma (2020), a daughter is a coparcener by birth with equal rights and liabilities in ancestral property, identical to a son.",
        "ok": true,
        "f": "Correct decision. Under the 2005 Amendment and the Supreme Court judgment in Vineeta Sharma (2020), a daughter is a coparcener by birth with equal rights and liabilities in ancestral property, identical to a son."
      },
      {
        "t": "Daughters forfeit all ancestral property rights immediately upon marriage.",
        "f": "Incorrect legal path. Daughters forfeit all ancestral property rights immediately upon marriage."
      },
      {
        "t": "Daughters can only claim property if there are no male relatives up to 4th generation.",
        "f": "Incorrect legal path. Daughters can only claim property if there are no male relatives up to 4th generation."
      }
    ]
  },
  {
    "type": "FAMILY / MAINTENANCE",
    "title": "Husband claims unemployment to evade maintenance under Section 125 CrPC / Section 144 BNSS.",
    "text": "A husband in a maintenance proceeding claimed he has no formal job or salary and therefore cannot pay any maintenance to his dependent wife and minor child.",
    "q": "What is the established legal principle regarding an able-bodied husband’s duty to maintain his family?",
    "o": [
      {
        "t": "An able-bodied husband is presumed to have earning capacity and cannot evade his moral and statutory duty to maintain his wife and child by pleading unemployment, as affirmed by the Supreme Court.",
        "ok": true,
        "f": "Correct decision. An able-bodied husband is presumed to have earning capacity and cannot evade his moral and statutory duty to maintain his wife and child by pleading unemployment, as affirmed by the Supreme Court."
      },
      {
        "t": "The court must immediately dismiss the maintenance application if the husband produces an unemployment slip.",
        "f": "Incorrect legal path. The court must immediately dismiss the maintenance application if the husband produces an unemployment slip."
      },
      {
        "t": "Maintenance is only payable by government employees with pension.",
        "f": "Incorrect legal path. Maintenance is only payable by government employees with pension."
      }
    ]
  },
  {
    "type": "FAMILY / DOMESTIC VIOLENCE",
    "title": "Aggrieved woman seeks right of residence in the shared household.",
    "text": "Following domestic discord, an in-law’s family locked out a woman from the matrimonial bungalow where she had resided since marriage, arguing that the property title was registered solely in the father-in-law’s name.",
    "q": "What right does the woman have under the Protection of Women from Domestic Violence Act, 2005 (PWDVA)?",
    "o": [
      {
        "t": "Under Section 17 of PWDVA and Satish Chander Ahuja v. Sneha Ahuja (2020), every woman in a domestic relationship has a statutory right to reside in the “shared household”, irrespective of who holds legal title.",
        "ok": true,
        "f": "Correct decision. Under Section 17 of PWDVA and Satish Chander Ahuja v. Sneha Ahuja (2020), every woman in a domestic relationship has a statutory right to reside in the “shared household”, irrespective of who holds legal title."
      },
      {
        "t": "The woman has zero rights to enter any property not registered in her personal name.",
        "f": "Incorrect legal path. The woman has zero rights to enter any property not registered in her personal name."
      },
      {
        "t": "The PWDVA applies only to commercial leases, not matrimonial homes.",
        "f": "Incorrect legal path. The PWDVA applies only to commercial leases, not matrimonial homes."
      }
    ]
  },
  {
    "type": "TORTS / MOTOR ACCIDENTS",
    "title": "Good Samaritan assists road accident victim and is harassed by bystanders.",
    "text": "A commuter transported a grievously injured pedestrian to the nearest hospital in his personal car. Police officers at the emergency room attempted to detain the commuter as a suspect and demanded his identification.",
    "q": "What protections exist for Good Samaritans under Section 134A of the Motor Vehicles Act and Supreme Court guidelines?",
    "o": [
      {
        "t": "Good Samaritans who render emergency medical assistance cannot be detained, harassed, forced to disclose identity, or made liable in civil or criminal proceedings for rendering aid.",
        "ok": true,
        "f": "Correct decision. Good Samaritans who render emergency medical assistance cannot be detained, harassed, forced to disclose identity, or made liable in civil or criminal proceedings for rendering aid."
      },
      {
        "t": "Every Good Samaritan is automatically presumed guilty until proven innocent.",
        "f": "Incorrect legal path. Every Good Samaritan is automatically presumed guilty until proven innocent."
      },
      {
        "t": "The hospital must detain anyone who brings in an accident patient until the victim’s family arrives.",
        "f": "Incorrect legal path. The hospital must detain anyone who brings in an accident patient until the victim’s family arrives."
      }
    ]
  },
  {
    "type": "TORTS / MEDICAL NEGLIGENCE",
    "title": "Surgeon leaves surgical instrument inside patient’s abdominal cavity.",
    "text": "Following routine surgery, a patient suffered intense abdominal pain for months. An X-ray revealed a surgical clamp left inside during the procedure.",
    "q": "Which legal doctrine applies to establish negligence without complex external proof?",
    "o": [
      {
        "t": "Res ipsa loquitur (“the thing speaks for itself”). Leaving a foreign object inside a patient during surgery is prima facie evidence of gross negligence shifting the burden of explanation to the surgeon.",
        "ok": true,
        "f": "Correct decision. Res ipsa loquitur (“the thing speaks for itself”). Leaving a foreign object inside a patient during surgery is prima facie evidence of gross negligence shifting the burden of explanation to the surgeon."
      },
      {
        "t": "Caveat emptor (“buyer beware”). The patient assumed the risk of surgical tools remaining inside.",
        "f": "Incorrect legal path. Caveat emptor (“buyer beware”). The patient assumed the risk of surgical tools remaining inside."
      },
      {
        "t": "Volenti non fit injuria. Signing a consent form allows surgeons to leave instruments behind.",
        "f": "Incorrect legal path. Volenti non fit injuria. Signing a consent form allows surgeons to leave instruments behind."
      }
    ]
  },
  {
    "type": "CRIMINAL / WITNESS",
    "title": "[Case 34] Hostile witness in a criminal trial: evidentiary value of testimony.",
    "text": "A key prosecution witness in an assault case turned hostile and denied his earlier police statement.",
    "q": "Can the court rely on any part of a hostile witness’s testimony under Section 154 IEA / Section 157 BSA?",
    "o": [
      {
        "t": "Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated.",
        "ok": true,
        "f": "Sound legal resolution. Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated."
      },
      {
        "t": "No. When a witness is declared hostile, their entire testimony is erased from the record.",
        "f": "Legally erroneous. No. When a witness is declared hostile, their entire testimony is erased from the record."
      },
      {
        "t": "The witness is automatically sentenced to 10 years in prison without trial.",
        "f": "Legally erroneous. The witness is automatically sentenced to 10 years in prison without trial."
      }
    ]
  },
  {
    "type": "CRIMINAL / FORENSIC",
    "title": "[Case 35] Refusal to give voice or handwriting sample during investigation.",
    "text": "An accused in an extortion case refused to give voice and handwriting samples for forensic analysis citing Article 20(3).",
    "q": "Does taking physical/voice specimens violate the right against self-incrimination?",
    "o": [
      {
        "t": "No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself.",
        "ok": true,
        "f": "Sound legal resolution. No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself."
      },
      {
        "t": "Yes. Any physical sample taken without consent violates Article 20(3).",
        "f": "Legally erroneous. Yes. Any physical sample taken without consent violates Article 20(3)."
      },
      {
        "t": "Voice samples can only be taken if the accused is convicted first.",
        "f": "Legally erroneous. Voice samples can only be taken if the accused is convicted first."
      }
    ]
  },
  {
    "type": "CONSTITUTIONAL / ARBITRARINESS",
    "title": "[Case 36] Government awards public tender to favoured bidder without advertising.",
    "text": "A municipal corporation awarded a ₹10 crore street lighting contract to a private firm through a secret backroom memo without issuing a public notice or competitive tender.",
    "q": "Does this violate Article 14 of the Constitution?",
    "o": [
      {
        "t": "Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14.",
        "ok": true,
        "f": "Sound legal resolution. Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14."
      },
      {
        "t": "No. The government can disburse public money to any private friend without tenders.",
        "f": "Legally erroneous. No. The government can disburse public money to any private friend without tenders."
      },
      {
        "t": "Tendering is only optional for contracts under ₹100 crore.",
        "f": "Legally erroneous. Tendering is only optional for contracts under ₹100 crore."
      }
    ]
  },
  {
    "type": "CYBER / FINANCIAL FRAUD",
    "title": "[Case 37] Bank customer loses funds to unauthorized SIM-swap UPI fraud.",
    "text": "A customer noticed sudden network loss on his mobile. Within 2 hours, ₹3,00,000 was siphoned from his bank account via unauthorized UPI transactions. He reported the fraud to the bank within 24 hours.",
    "q": "What is the customer’s liability under RBI’s Zero Liability circular for unauthorized electronic banking transactions?",
    "o": [
      {
        "t": "Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days.",
        "ok": true,
        "f": "Sound legal resolution. Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days."
      },
      {
        "t": "The customer is 100% liable for all cyber attacks on their bank account.",
        "f": "Legally erroneous. The customer is 100% liable for all cyber attacks on their bank account."
      },
      {
        "t": "The bank is immune unless the cyber criminal is physically arrested.",
        "f": "Legally erroneous. The bank is immune unless the cyber criminal is physically arrested."
      }
    ]
  },
  {
    "type": "CONSUMER / FLIGHT CANCELLATION",
    "title": "[Case 38] Airline cancels domestic flight without weather or technical emergency.",
    "text": "An airline cancelled a flight 3 hours before departure for commercial reasons (low occupancy) and offered neither alternate transportation nor compensation.",
    "q": "What are the passenger rights under DGCA passenger charter regulations?",
    "o": [
      {
        "t": "Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration.",
        "ok": true,
        "f": "Sound legal resolution. Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration."
      },
      {
        "t": "Airlines have absolute right to cancel flights without any refund or compensation.",
        "f": "Legally erroneous. Airlines have absolute right to cancel flights without any refund or compensation."
      },
      {
        "t": "Passengers must pay a penalty to the airline if a flight is cancelled.",
        "f": "Legally erroneous. Passengers must pay a penalty to the airline if a flight is cancelled."
      }
    ]
  },
  {
    "type": "PROPERTY / ADVERSE POSSESSION",
    "title": "[Case 39] Claim of adverse possession over private land: Essential requirement.",
    "text": "A person occupied an empty residential plot for 14 years openly, continuously, and hostile to the real owner who took no legal steps.",
    "q": "What is the statutory limitation period to claim adverse possession against private property under Article 65 of the Limitation Act, 1963?",
    "o": [
      {
        "t": "12 years of open, continuous, and hostile possession against the true owner (30 years for government land).",
        "ok": true,
        "f": "Sound legal resolution. 12 years of open, continuous, and hostile possession against the true owner (30 years for government land)."
      },
      {
        "t": "1 year of permissive tenancy.",
        "f": "Legally erroneous. 1 year of permissive tenancy."
      },
      {
        "t": "Adverse possession requires at least 100 years in India.",
        "f": "Legally erroneous. Adverse possession requires at least 100 years in India."
      }
    ]
  },
  {
    "type": "FAMILY / ADOPTION",
    "title": "[Case 40] Single male seeking to adopt a girl child under CARA / JJ Act.",
    "text": "A 32-year-old unmarried man applied through the Central Adoption Resource Authority (CARA) to adopt a 5-year-old girl child.",
    "q": "Can a single male adopt a female child under Section 57 of the Juvenile Justice (Care and Protection of Children) Act, 2015?",
    "o": [
      {
        "t": "No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender.",
        "ok": true,
        "f": "Sound legal resolution. No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender."
      },
      {
        "t": "Yes. Any adult citizen can adopt a child of any gender without restriction.",
        "f": "Legally erroneous. Yes. Any adult citizen can adopt a child of any gender without restriction."
      },
      {
        "t": "Adoption is prohibited for all unmarried individuals in India.",
        "f": "Legally erroneous. Adoption is prohibited for all unmarried individuals in India."
      }
    ]
  },
  {
    "type": "TORTS / DEFAMATION",
    "title": "[Case 41] Public interest review of a restaurant: Defence against defamation.",
    "text": "A food critic published an honest, factual review of a restaurant documenting unhygienic kitchen conditions with dated photographs. The restaurant sued for ₹10 lakh civil defamation.",
    "q": "What defence protects the critic under the law of torts and criminal law?",
    "o": [
      {
        "t": "Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation.",
        "ok": true,
        "f": "Sound legal resolution. Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation."
      },
      {
        "t": "Defamation allows zero defences; any negative review is automatically illegal.",
        "f": "Legally erroneous. Defamation allows zero defences; any negative review is automatically illegal."
      },
      {
        "t": "Critics must obtain written permission from the restaurant owner before posting any review.",
        "f": "Legally erroneous. Critics must obtain written permission from the restaurant owner before posting any review."
      }
    ]
  },
  {
    "type": "CRIMINAL / WITNESS",
    "title": "[Case 42] Hostile witness in a criminal trial: evidentiary value of testimony.",
    "text": "A key prosecution witness in an assault case turned hostile and denied his earlier police statement.",
    "q": "Can the court rely on any part of a hostile witness’s testimony under Section 154 IEA / Section 157 BSA?",
    "o": [
      {
        "t": "Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated.",
        "ok": true,
        "f": "Sound legal resolution. Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated."
      },
      {
        "t": "No. When a witness is declared hostile, their entire testimony is erased from the record.",
        "f": "Legally erroneous. No. When a witness is declared hostile, their entire testimony is erased from the record."
      },
      {
        "t": "The witness is automatically sentenced to 10 years in prison without trial.",
        "f": "Legally erroneous. The witness is automatically sentenced to 10 years in prison without trial."
      }
    ]
  },
  {
    "type": "CRIMINAL / FORENSIC",
    "title": "[Case 43] Refusal to give voice or handwriting sample during investigation.",
    "text": "An accused in an extortion case refused to give voice and handwriting samples for forensic analysis citing Article 20(3).",
    "q": "Does taking physical/voice specimens violate the right against self-incrimination?",
    "o": [
      {
        "t": "No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself.",
        "ok": true,
        "f": "Sound legal resolution. No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself."
      },
      {
        "t": "Yes. Any physical sample taken without consent violates Article 20(3).",
        "f": "Legally erroneous. Yes. Any physical sample taken without consent violates Article 20(3)."
      },
      {
        "t": "Voice samples can only be taken if the accused is convicted first.",
        "f": "Legally erroneous. Voice samples can only be taken if the accused is convicted first."
      }
    ]
  },
  {
    "type": "CONSTITUTIONAL / ARBITRARINESS",
    "title": "[Case 44] Government awards public tender to favoured bidder without advertising.",
    "text": "A municipal corporation awarded a ₹10 crore street lighting contract to a private firm through a secret backroom memo without issuing a public notice or competitive tender.",
    "q": "Does this violate Article 14 of the Constitution?",
    "o": [
      {
        "t": "Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14.",
        "ok": true,
        "f": "Sound legal resolution. Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14."
      },
      {
        "t": "No. The government can disburse public money to any private friend without tenders.",
        "f": "Legally erroneous. No. The government can disburse public money to any private friend without tenders."
      },
      {
        "t": "Tendering is only optional for contracts under ₹100 crore.",
        "f": "Legally erroneous. Tendering is only optional for contracts under ₹100 crore."
      }
    ]
  },
  {
    "type": "CYBER / FINANCIAL FRAUD",
    "title": "[Case 45] Bank customer loses funds to unauthorized SIM-swap UPI fraud.",
    "text": "A customer noticed sudden network loss on his mobile. Within 2 hours, ₹3,00,000 was siphoned from his bank account via unauthorized UPI transactions. He reported the fraud to the bank within 24 hours.",
    "q": "What is the customer’s liability under RBI’s Zero Liability circular for unauthorized electronic banking transactions?",
    "o": [
      {
        "t": "Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days.",
        "ok": true,
        "f": "Sound legal resolution. Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days."
      },
      {
        "t": "The customer is 100% liable for all cyber attacks on their bank account.",
        "f": "Legally erroneous. The customer is 100% liable for all cyber attacks on their bank account."
      },
      {
        "t": "The bank is immune unless the cyber criminal is physically arrested.",
        "f": "Legally erroneous. The bank is immune unless the cyber criminal is physically arrested."
      }
    ]
  },
  {
    "type": "CONSUMER / FLIGHT CANCELLATION",
    "title": "[Case 46] Airline cancels domestic flight without weather or technical emergency.",
    "text": "An airline cancelled a flight 3 hours before departure for commercial reasons (low occupancy) and offered neither alternate transportation nor compensation.",
    "q": "What are the passenger rights under DGCA passenger charter regulations?",
    "o": [
      {
        "t": "Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration.",
        "ok": true,
        "f": "Sound legal resolution. Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration."
      },
      {
        "t": "Airlines have absolute right to cancel flights without any refund or compensation.",
        "f": "Legally erroneous. Airlines have absolute right to cancel flights without any refund or compensation."
      },
      {
        "t": "Passengers must pay a penalty to the airline if a flight is cancelled.",
        "f": "Legally erroneous. Passengers must pay a penalty to the airline if a flight is cancelled."
      }
    ]
  },
  {
    "type": "PROPERTY / ADVERSE POSSESSION",
    "title": "[Case 47] Claim of adverse possession over private land: Essential requirement.",
    "text": "A person occupied an empty residential plot for 14 years openly, continuously, and hostile to the real owner who took no legal steps.",
    "q": "What is the statutory limitation period to claim adverse possession against private property under Article 65 of the Limitation Act, 1963?",
    "o": [
      {
        "t": "12 years of open, continuous, and hostile possession against the true owner (30 years for government land).",
        "ok": true,
        "f": "Sound legal resolution. 12 years of open, continuous, and hostile possession against the true owner (30 years for government land)."
      },
      {
        "t": "1 year of permissive tenancy.",
        "f": "Legally erroneous. 1 year of permissive tenancy."
      },
      {
        "t": "Adverse possession requires at least 100 years in India.",
        "f": "Legally erroneous. Adverse possession requires at least 100 years in India."
      }
    ]
  },
  {
    "type": "FAMILY / ADOPTION",
    "title": "[Case 48] Single male seeking to adopt a girl child under CARA / JJ Act.",
    "text": "A 32-year-old unmarried man applied through the Central Adoption Resource Authority (CARA) to adopt a 5-year-old girl child.",
    "q": "Can a single male adopt a female child under Section 57 of the Juvenile Justice (Care and Protection of Children) Act, 2015?",
    "o": [
      {
        "t": "No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender.",
        "ok": true,
        "f": "Sound legal resolution. No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender."
      },
      {
        "t": "Yes. Any adult citizen can adopt a child of any gender without restriction.",
        "f": "Legally erroneous. Yes. Any adult citizen can adopt a child of any gender without restriction."
      },
      {
        "t": "Adoption is prohibited for all unmarried individuals in India.",
        "f": "Legally erroneous. Adoption is prohibited for all unmarried individuals in India."
      }
    ]
  },
  {
    "type": "TORTS / DEFAMATION",
    "title": "[Case 49] Public interest review of a restaurant: Defence against defamation.",
    "text": "A food critic published an honest, factual review of a restaurant documenting unhygienic kitchen conditions with dated photographs. The restaurant sued for ₹10 lakh civil defamation.",
    "q": "What defence protects the critic under the law of torts and criminal law?",
    "o": [
      {
        "t": "Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation.",
        "ok": true,
        "f": "Sound legal resolution. Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation."
      },
      {
        "t": "Defamation allows zero defences; any negative review is automatically illegal.",
        "f": "Legally erroneous. Defamation allows zero defences; any negative review is automatically illegal."
      },
      {
        "t": "Critics must obtain written permission from the restaurant owner before posting any review.",
        "f": "Legally erroneous. Critics must obtain written permission from the restaurant owner before posting any review."
      }
    ]
  },
  {
    "type": "CRIMINAL / WITNESS",
    "title": "[Case 50] Hostile witness in a criminal trial: evidentiary value of testimony.",
    "text": "A key prosecution witness in an assault case turned hostile and denied his earlier police statement.",
    "q": "Can the court rely on any part of a hostile witness’s testimony under Section 154 IEA / Section 157 BSA?",
    "o": [
      {
        "t": "Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated.",
        "ok": true,
        "f": "Sound legal resolution. Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated."
      },
      {
        "t": "No. When a witness is declared hostile, their entire testimony is erased from the record.",
        "f": "Legally erroneous. No. When a witness is declared hostile, their entire testimony is erased from the record."
      },
      {
        "t": "The witness is automatically sentenced to 10 years in prison without trial.",
        "f": "Legally erroneous. The witness is automatically sentenced to 10 years in prison without trial."
      }
    ]
  },
  {
    "type": "CRIMINAL / FORENSIC",
    "title": "[Case 51] Refusal to give voice or handwriting sample during investigation.",
    "text": "An accused in an extortion case refused to give voice and handwriting samples for forensic analysis citing Article 20(3).",
    "q": "Does taking physical/voice specimens violate the right against self-incrimination?",
    "o": [
      {
        "t": "No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself.",
        "ok": true,
        "f": "Sound legal resolution. No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself."
      },
      {
        "t": "Yes. Any physical sample taken without consent violates Article 20(3).",
        "f": "Legally erroneous. Yes. Any physical sample taken without consent violates Article 20(3)."
      },
      {
        "t": "Voice samples can only be taken if the accused is convicted first.",
        "f": "Legally erroneous. Voice samples can only be taken if the accused is convicted first."
      }
    ]
  },
  {
    "type": "CONSTITUTIONAL / ARBITRARINESS",
    "title": "[Case 52] Government awards public tender to favoured bidder without advertising.",
    "text": "A municipal corporation awarded a ₹10 crore street lighting contract to a private firm through a secret backroom memo without issuing a public notice or competitive tender.",
    "q": "Does this violate Article 14 of the Constitution?",
    "o": [
      {
        "t": "Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14.",
        "ok": true,
        "f": "Sound legal resolution. Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14."
      },
      {
        "t": "No. The government can disburse public money to any private friend without tenders.",
        "f": "Legally erroneous. No. The government can disburse public money to any private friend without tenders."
      },
      {
        "t": "Tendering is only optional for contracts under ₹100 crore.",
        "f": "Legally erroneous. Tendering is only optional for contracts under ₹100 crore."
      }
    ]
  },
  {
    "type": "CYBER / FINANCIAL FRAUD",
    "title": "[Case 53] Bank customer loses funds to unauthorized SIM-swap UPI fraud.",
    "text": "A customer noticed sudden network loss on his mobile. Within 2 hours, ₹3,00,000 was siphoned from his bank account via unauthorized UPI transactions. He reported the fraud to the bank within 24 hours.",
    "q": "What is the customer’s liability under RBI’s Zero Liability circular for unauthorized electronic banking transactions?",
    "o": [
      {
        "t": "Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days.",
        "ok": true,
        "f": "Sound legal resolution. Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days."
      },
      {
        "t": "The customer is 100% liable for all cyber attacks on their bank account.",
        "f": "Legally erroneous. The customer is 100% liable for all cyber attacks on their bank account."
      },
      {
        "t": "The bank is immune unless the cyber criminal is physically arrested.",
        "f": "Legally erroneous. The bank is immune unless the cyber criminal is physically arrested."
      }
    ]
  },
  {
    "type": "CONSUMER / FLIGHT CANCELLATION",
    "title": "[Case 54] Airline cancels domestic flight without weather or technical emergency.",
    "text": "An airline cancelled a flight 3 hours before departure for commercial reasons (low occupancy) and offered neither alternate transportation nor compensation.",
    "q": "What are the passenger rights under DGCA passenger charter regulations?",
    "o": [
      {
        "t": "Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration.",
        "ok": true,
        "f": "Sound legal resolution. Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration."
      },
      {
        "t": "Airlines have absolute right to cancel flights without any refund or compensation.",
        "f": "Legally erroneous. Airlines have absolute right to cancel flights without any refund or compensation."
      },
      {
        "t": "Passengers must pay a penalty to the airline if a flight is cancelled.",
        "f": "Legally erroneous. Passengers must pay a penalty to the airline if a flight is cancelled."
      }
    ]
  },
  {
    "type": "PROPERTY / ADVERSE POSSESSION",
    "title": "[Case 55] Claim of adverse possession over private land: Essential requirement.",
    "text": "A person occupied an empty residential plot for 14 years openly, continuously, and hostile to the real owner who took no legal steps.",
    "q": "What is the statutory limitation period to claim adverse possession against private property under Article 65 of the Limitation Act, 1963?",
    "o": [
      {
        "t": "12 years of open, continuous, and hostile possession against the true owner (30 years for government land).",
        "ok": true,
        "f": "Sound legal resolution. 12 years of open, continuous, and hostile possession against the true owner (30 years for government land)."
      },
      {
        "t": "1 year of permissive tenancy.",
        "f": "Legally erroneous. 1 year of permissive tenancy."
      },
      {
        "t": "Adverse possession requires at least 100 years in India.",
        "f": "Legally erroneous. Adverse possession requires at least 100 years in India."
      }
    ]
  },
  {
    "type": "FAMILY / ADOPTION",
    "title": "[Case 56] Single male seeking to adopt a girl child under CARA / JJ Act.",
    "text": "A 32-year-old unmarried man applied through the Central Adoption Resource Authority (CARA) to adopt a 5-year-old girl child.",
    "q": "Can a single male adopt a female child under Section 57 of the Juvenile Justice (Care and Protection of Children) Act, 2015?",
    "o": [
      {
        "t": "No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender.",
        "ok": true,
        "f": "Sound legal resolution. No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender."
      },
      {
        "t": "Yes. Any adult citizen can adopt a child of any gender without restriction.",
        "f": "Legally erroneous. Yes. Any adult citizen can adopt a child of any gender without restriction."
      },
      {
        "t": "Adoption is prohibited for all unmarried individuals in India.",
        "f": "Legally erroneous. Adoption is prohibited for all unmarried individuals in India."
      }
    ]
  },
  {
    "type": "TORTS / DEFAMATION",
    "title": "[Case 57] Public interest review of a restaurant: Defence against defamation.",
    "text": "A food critic published an honest, factual review of a restaurant documenting unhygienic kitchen conditions with dated photographs. The restaurant sued for ₹10 lakh civil defamation.",
    "q": "What defence protects the critic under the law of torts and criminal law?",
    "o": [
      {
        "t": "Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation.",
        "ok": true,
        "f": "Sound legal resolution. Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation."
      },
      {
        "t": "Defamation allows zero defences; any negative review is automatically illegal.",
        "f": "Legally erroneous. Defamation allows zero defences; any negative review is automatically illegal."
      },
      {
        "t": "Critics must obtain written permission from the restaurant owner before posting any review.",
        "f": "Legally erroneous. Critics must obtain written permission from the restaurant owner before posting any review."
      }
    ]
  },
  {
    "type": "CRIMINAL / WITNESS",
    "title": "[Case 58] Hostile witness in a criminal trial: evidentiary value of testimony.",
    "text": "A key prosecution witness in an assault case turned hostile and denied his earlier police statement.",
    "q": "Can the court rely on any part of a hostile witness’s testimony under Section 154 IEA / Section 157 BSA?",
    "o": [
      {
        "t": "Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated.",
        "ok": true,
        "f": "Sound legal resolution. Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated."
      },
      {
        "t": "No. When a witness is declared hostile, their entire testimony is erased from the record.",
        "f": "Legally erroneous. No. When a witness is declared hostile, their entire testimony is erased from the record."
      },
      {
        "t": "The witness is automatically sentenced to 10 years in prison without trial.",
        "f": "Legally erroneous. The witness is automatically sentenced to 10 years in prison without trial."
      }
    ]
  },
  {
    "type": "CRIMINAL / FORENSIC",
    "title": "[Case 59] Refusal to give voice or handwriting sample during investigation.",
    "text": "An accused in an extortion case refused to give voice and handwriting samples for forensic analysis citing Article 20(3).",
    "q": "Does taking physical/voice specimens violate the right against self-incrimination?",
    "o": [
      {
        "t": "No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself.",
        "ok": true,
        "f": "Sound legal resolution. No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself."
      },
      {
        "t": "Yes. Any physical sample taken without consent violates Article 20(3).",
        "f": "Legally erroneous. Yes. Any physical sample taken without consent violates Article 20(3)."
      },
      {
        "t": "Voice samples can only be taken if the accused is convicted first.",
        "f": "Legally erroneous. Voice samples can only be taken if the accused is convicted first."
      }
    ]
  },
  {
    "type": "CONSTITUTIONAL / ARBITRARINESS",
    "title": "[Case 60] Government awards public tender to favoured bidder without advertising.",
    "text": "A municipal corporation awarded a ₹10 crore street lighting contract to a private firm through a secret backroom memo without issuing a public notice or competitive tender.",
    "q": "Does this violate Article 14 of the Constitution?",
    "o": [
      {
        "t": "Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14.",
        "ok": true,
        "f": "Sound legal resolution. Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14."
      },
      {
        "t": "No. The government can disburse public money to any private friend without tenders.",
        "f": "Legally erroneous. No. The government can disburse public money to any private friend without tenders."
      },
      {
        "t": "Tendering is only optional for contracts under ₹100 crore.",
        "f": "Legally erroneous. Tendering is only optional for contracts under ₹100 crore."
      }
    ]
  },
  {
    "type": "CYBER / FINANCIAL FRAUD",
    "title": "[Case 61] Bank customer loses funds to unauthorized SIM-swap UPI fraud.",
    "text": "A customer noticed sudden network loss on his mobile. Within 2 hours, ₹3,00,000 was siphoned from his bank account via unauthorized UPI transactions. He reported the fraud to the bank within 24 hours.",
    "q": "What is the customer’s liability under RBI’s Zero Liability circular for unauthorized electronic banking transactions?",
    "o": [
      {
        "t": "Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days.",
        "ok": true,
        "f": "Sound legal resolution. Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days."
      },
      {
        "t": "The customer is 100% liable for all cyber attacks on their bank account.",
        "f": "Legally erroneous. The customer is 100% liable for all cyber attacks on their bank account."
      },
      {
        "t": "The bank is immune unless the cyber criminal is physically arrested.",
        "f": "Legally erroneous. The bank is immune unless the cyber criminal is physically arrested."
      }
    ]
  },
  {
    "type": "CONSUMER / FLIGHT CANCELLATION",
    "title": "[Case 62] Airline cancels domestic flight without weather or technical emergency.",
    "text": "An airline cancelled a flight 3 hours before departure for commercial reasons (low occupancy) and offered neither alternate transportation nor compensation.",
    "q": "What are the passenger rights under DGCA passenger charter regulations?",
    "o": [
      {
        "t": "Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration.",
        "ok": true,
        "f": "Sound legal resolution. Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration."
      },
      {
        "t": "Airlines have absolute right to cancel flights without any refund or compensation.",
        "f": "Legally erroneous. Airlines have absolute right to cancel flights without any refund or compensation."
      },
      {
        "t": "Passengers must pay a penalty to the airline if a flight is cancelled.",
        "f": "Legally erroneous. Passengers must pay a penalty to the airline if a flight is cancelled."
      }
    ]
  },
  {
    "type": "PROPERTY / ADVERSE POSSESSION",
    "title": "[Case 63] Claim of adverse possession over private land: Essential requirement.",
    "text": "A person occupied an empty residential plot for 14 years openly, continuously, and hostile to the real owner who took no legal steps.",
    "q": "What is the statutory limitation period to claim adverse possession against private property under Article 65 of the Limitation Act, 1963?",
    "o": [
      {
        "t": "12 years of open, continuous, and hostile possession against the true owner (30 years for government land).",
        "ok": true,
        "f": "Sound legal resolution. 12 years of open, continuous, and hostile possession against the true owner (30 years for government land)."
      },
      {
        "t": "1 year of permissive tenancy.",
        "f": "Legally erroneous. 1 year of permissive tenancy."
      },
      {
        "t": "Adverse possession requires at least 100 years in India.",
        "f": "Legally erroneous. Adverse possession requires at least 100 years in India."
      }
    ]
  },
  {
    "type": "FAMILY / ADOPTION",
    "title": "[Case 64] Single male seeking to adopt a girl child under CARA / JJ Act.",
    "text": "A 32-year-old unmarried man applied through the Central Adoption Resource Authority (CARA) to adopt a 5-year-old girl child.",
    "q": "Can a single male adopt a female child under Section 57 of the Juvenile Justice (Care and Protection of Children) Act, 2015?",
    "o": [
      {
        "t": "No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender.",
        "ok": true,
        "f": "Sound legal resolution. No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender."
      },
      {
        "t": "Yes. Any adult citizen can adopt a child of any gender without restriction.",
        "f": "Legally erroneous. Yes. Any adult citizen can adopt a child of any gender without restriction."
      },
      {
        "t": "Adoption is prohibited for all unmarried individuals in India.",
        "f": "Legally erroneous. Adoption is prohibited for all unmarried individuals in India."
      }
    ]
  },
  {
    "type": "TORTS / DEFAMATION",
    "title": "[Case 65] Public interest review of a restaurant: Defence against defamation.",
    "text": "A food critic published an honest, factual review of a restaurant documenting unhygienic kitchen conditions with dated photographs. The restaurant sued for ₹10 lakh civil defamation.",
    "q": "What defence protects the critic under the law of torts and criminal law?",
    "o": [
      {
        "t": "Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation.",
        "ok": true,
        "f": "Sound legal resolution. Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation."
      },
      {
        "t": "Defamation allows zero defences; any negative review is automatically illegal.",
        "f": "Legally erroneous. Defamation allows zero defences; any negative review is automatically illegal."
      },
      {
        "t": "Critics must obtain written permission from the restaurant owner before posting any review.",
        "f": "Legally erroneous. Critics must obtain written permission from the restaurant owner before posting any review."
      }
    ]
  },
  {
    "type": "CRIMINAL / WITNESS",
    "title": "[Case 66] Hostile witness in a criminal trial: evidentiary value of testimony.",
    "text": "A key prosecution witness in an assault case turned hostile and denied his earlier police statement.",
    "q": "Can the court rely on any part of a hostile witness’s testimony under Section 154 IEA / Section 157 BSA?",
    "o": [
      {
        "t": "Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated.",
        "ok": true,
        "f": "Sound legal resolution. Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated."
      },
      {
        "t": "No. When a witness is declared hostile, their entire testimony is erased from the record.",
        "f": "Legally erroneous. No. When a witness is declared hostile, their entire testimony is erased from the record."
      },
      {
        "t": "The witness is automatically sentenced to 10 years in prison without trial.",
        "f": "Legally erroneous. The witness is automatically sentenced to 10 years in prison without trial."
      }
    ]
  },
  {
    "type": "CRIMINAL / FORENSIC",
    "title": "[Case 67] Refusal to give voice or handwriting sample during investigation.",
    "text": "An accused in an extortion case refused to give voice and handwriting samples for forensic analysis citing Article 20(3).",
    "q": "Does taking physical/voice specimens violate the right against self-incrimination?",
    "o": [
      {
        "t": "No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself.",
        "ok": true,
        "f": "Sound legal resolution. No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself."
      },
      {
        "t": "Yes. Any physical sample taken without consent violates Article 20(3).",
        "f": "Legally erroneous. Yes. Any physical sample taken without consent violates Article 20(3)."
      },
      {
        "t": "Voice samples can only be taken if the accused is convicted first.",
        "f": "Legally erroneous. Voice samples can only be taken if the accused is convicted first."
      }
    ]
  },
  {
    "type": "CONSTITUTIONAL / ARBITRARINESS",
    "title": "[Case 68] Government awards public tender to favoured bidder without advertising.",
    "text": "A municipal corporation awarded a ₹10 crore street lighting contract to a private firm through a secret backroom memo without issuing a public notice or competitive tender.",
    "q": "Does this violate Article 14 of the Constitution?",
    "o": [
      {
        "t": "Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14.",
        "ok": true,
        "f": "Sound legal resolution. Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14."
      },
      {
        "t": "No. The government can disburse public money to any private friend without tenders.",
        "f": "Legally erroneous. No. The government can disburse public money to any private friend without tenders."
      },
      {
        "t": "Tendering is only optional for contracts under ₹100 crore.",
        "f": "Legally erroneous. Tendering is only optional for contracts under ₹100 crore."
      }
    ]
  },
  {
    "type": "CYBER / FINANCIAL FRAUD",
    "title": "[Case 69] Bank customer loses funds to unauthorized SIM-swap UPI fraud.",
    "text": "A customer noticed sudden network loss on his mobile. Within 2 hours, ₹3,00,000 was siphoned from his bank account via unauthorized UPI transactions. He reported the fraud to the bank within 24 hours.",
    "q": "What is the customer’s liability under RBI’s Zero Liability circular for unauthorized electronic banking transactions?",
    "o": [
      {
        "t": "Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days.",
        "ok": true,
        "f": "Sound legal resolution. Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days."
      },
      {
        "t": "The customer is 100% liable for all cyber attacks on their bank account.",
        "f": "Legally erroneous. The customer is 100% liable for all cyber attacks on their bank account."
      },
      {
        "t": "The bank is immune unless the cyber criminal is physically arrested.",
        "f": "Legally erroneous. The bank is immune unless the cyber criminal is physically arrested."
      }
    ]
  },
  {
    "type": "CONSUMER / FLIGHT CANCELLATION",
    "title": "[Case 70] Airline cancels domestic flight without weather or technical emergency.",
    "text": "An airline cancelled a flight 3 hours before departure for commercial reasons (low occupancy) and offered neither alternate transportation nor compensation.",
    "q": "What are the passenger rights under DGCA passenger charter regulations?",
    "o": [
      {
        "t": "Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration.",
        "ok": true,
        "f": "Sound legal resolution. Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration."
      },
      {
        "t": "Airlines have absolute right to cancel flights without any refund or compensation.",
        "f": "Legally erroneous. Airlines have absolute right to cancel flights without any refund or compensation."
      },
      {
        "t": "Passengers must pay a penalty to the airline if a flight is cancelled.",
        "f": "Legally erroneous. Passengers must pay a penalty to the airline if a flight is cancelled."
      }
    ]
  },
  {
    "type": "PROPERTY / ADVERSE POSSESSION",
    "title": "[Case 71] Claim of adverse possession over private land: Essential requirement.",
    "text": "A person occupied an empty residential plot for 14 years openly, continuously, and hostile to the real owner who took no legal steps.",
    "q": "What is the statutory limitation period to claim adverse possession against private property under Article 65 of the Limitation Act, 1963?",
    "o": [
      {
        "t": "12 years of open, continuous, and hostile possession against the true owner (30 years for government land).",
        "ok": true,
        "f": "Sound legal resolution. 12 years of open, continuous, and hostile possession against the true owner (30 years for government land)."
      },
      {
        "t": "1 year of permissive tenancy.",
        "f": "Legally erroneous. 1 year of permissive tenancy."
      },
      {
        "t": "Adverse possession requires at least 100 years in India.",
        "f": "Legally erroneous. Adverse possession requires at least 100 years in India."
      }
    ]
  },
  {
    "type": "FAMILY / ADOPTION",
    "title": "[Case 72] Single male seeking to adopt a girl child under CARA / JJ Act.",
    "text": "A 32-year-old unmarried man applied through the Central Adoption Resource Authority (CARA) to adopt a 5-year-old girl child.",
    "q": "Can a single male adopt a female child under Section 57 of the Juvenile Justice (Care and Protection of Children) Act, 2015?",
    "o": [
      {
        "t": "No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender.",
        "ok": true,
        "f": "Sound legal resolution. No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender."
      },
      {
        "t": "Yes. Any adult citizen can adopt a child of any gender without restriction.",
        "f": "Legally erroneous. Yes. Any adult citizen can adopt a child of any gender without restriction."
      },
      {
        "t": "Adoption is prohibited for all unmarried individuals in India.",
        "f": "Legally erroneous. Adoption is prohibited for all unmarried individuals in India."
      }
    ]
  },
  {
    "type": "TORTS / DEFAMATION",
    "title": "[Case 73] Public interest review of a restaurant: Defence against defamation.",
    "text": "A food critic published an honest, factual review of a restaurant documenting unhygienic kitchen conditions with dated photographs. The restaurant sued for ₹10 lakh civil defamation.",
    "q": "What defence protects the critic under the law of torts and criminal law?",
    "o": [
      {
        "t": "Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation.",
        "ok": true,
        "f": "Sound legal resolution. Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation."
      },
      {
        "t": "Defamation allows zero defences; any negative review is automatically illegal.",
        "f": "Legally erroneous. Defamation allows zero defences; any negative review is automatically illegal."
      },
      {
        "t": "Critics must obtain written permission from the restaurant owner before posting any review.",
        "f": "Legally erroneous. Critics must obtain written permission from the restaurant owner before posting any review."
      }
    ]
  },
  {
    "type": "CRIMINAL / WITNESS",
    "title": "[Case 74] Hostile witness in a criminal trial: evidentiary value of testimony.",
    "text": "A key prosecution witness in an assault case turned hostile and denied his earlier police statement.",
    "q": "Can the court rely on any part of a hostile witness’s testimony under Section 154 IEA / Section 157 BSA?",
    "o": [
      {
        "t": "Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated.",
        "ok": true,
        "f": "Sound legal resolution. Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated."
      },
      {
        "t": "No. When a witness is declared hostile, their entire testimony is erased from the record.",
        "f": "Legally erroneous. No. When a witness is declared hostile, their entire testimony is erased from the record."
      },
      {
        "t": "The witness is automatically sentenced to 10 years in prison without trial.",
        "f": "Legally erroneous. The witness is automatically sentenced to 10 years in prison without trial."
      }
    ]
  },
  {
    "type": "CRIMINAL / FORENSIC",
    "title": "[Case 75] Refusal to give voice or handwriting sample during investigation.",
    "text": "An accused in an extortion case refused to give voice and handwriting samples for forensic analysis citing Article 20(3).",
    "q": "Does taking physical/voice specimens violate the right against self-incrimination?",
    "o": [
      {
        "t": "No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself.",
        "ok": true,
        "f": "Sound legal resolution. No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself."
      },
      {
        "t": "Yes. Any physical sample taken without consent violates Article 20(3).",
        "f": "Legally erroneous. Yes. Any physical sample taken without consent violates Article 20(3)."
      },
      {
        "t": "Voice samples can only be taken if the accused is convicted first.",
        "f": "Legally erroneous. Voice samples can only be taken if the accused is convicted first."
      }
    ]
  },
  {
    "type": "CONSTITUTIONAL / ARBITRARINESS",
    "title": "[Case 76] Government awards public tender to favoured bidder without advertising.",
    "text": "A municipal corporation awarded a ₹10 crore street lighting contract to a private firm through a secret backroom memo without issuing a public notice or competitive tender.",
    "q": "Does this violate Article 14 of the Constitution?",
    "o": [
      {
        "t": "Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14.",
        "ok": true,
        "f": "Sound legal resolution. Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14."
      },
      {
        "t": "No. The government can disburse public money to any private friend without tenders.",
        "f": "Legally erroneous. No. The government can disburse public money to any private friend without tenders."
      },
      {
        "t": "Tendering is only optional for contracts under ₹100 crore.",
        "f": "Legally erroneous. Tendering is only optional for contracts under ₹100 crore."
      }
    ]
  },
  {
    "type": "CYBER / FINANCIAL FRAUD",
    "title": "[Case 77] Bank customer loses funds to unauthorized SIM-swap UPI fraud.",
    "text": "A customer noticed sudden network loss on his mobile. Within 2 hours, ₹3,00,000 was siphoned from his bank account via unauthorized UPI transactions. He reported the fraud to the bank within 24 hours.",
    "q": "What is the customer’s liability under RBI’s Zero Liability circular for unauthorized electronic banking transactions?",
    "o": [
      {
        "t": "Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days.",
        "ok": true,
        "f": "Sound legal resolution. Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days."
      },
      {
        "t": "The customer is 100% liable for all cyber attacks on their bank account.",
        "f": "Legally erroneous. The customer is 100% liable for all cyber attacks on their bank account."
      },
      {
        "t": "The bank is immune unless the cyber criminal is physically arrested.",
        "f": "Legally erroneous. The bank is immune unless the cyber criminal is physically arrested."
      }
    ]
  },
  {
    "type": "CONSUMER / FLIGHT CANCELLATION",
    "title": "[Case 78] Airline cancels domestic flight without weather or technical emergency.",
    "text": "An airline cancelled a flight 3 hours before departure for commercial reasons (low occupancy) and offered neither alternate transportation nor compensation.",
    "q": "What are the passenger rights under DGCA passenger charter regulations?",
    "o": [
      {
        "t": "Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration.",
        "ok": true,
        "f": "Sound legal resolution. Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration."
      },
      {
        "t": "Airlines have absolute right to cancel flights without any refund or compensation.",
        "f": "Legally erroneous. Airlines have absolute right to cancel flights without any refund or compensation."
      },
      {
        "t": "Passengers must pay a penalty to the airline if a flight is cancelled.",
        "f": "Legally erroneous. Passengers must pay a penalty to the airline if a flight is cancelled."
      }
    ]
  },
  {
    "type": "PROPERTY / ADVERSE POSSESSION",
    "title": "[Case 79] Claim of adverse possession over private land: Essential requirement.",
    "text": "A person occupied an empty residential plot for 14 years openly, continuously, and hostile to the real owner who took no legal steps.",
    "q": "What is the statutory limitation period to claim adverse possession against private property under Article 65 of the Limitation Act, 1963?",
    "o": [
      {
        "t": "12 years of open, continuous, and hostile possession against the true owner (30 years for government land).",
        "ok": true,
        "f": "Sound legal resolution. 12 years of open, continuous, and hostile possession against the true owner (30 years for government land)."
      },
      {
        "t": "1 year of permissive tenancy.",
        "f": "Legally erroneous. 1 year of permissive tenancy."
      },
      {
        "t": "Adverse possession requires at least 100 years in India.",
        "f": "Legally erroneous. Adverse possession requires at least 100 years in India."
      }
    ]
  },
  {
    "type": "FAMILY / ADOPTION",
    "title": "[Case 80] Single male seeking to adopt a girl child under CARA / JJ Act.",
    "text": "A 32-year-old unmarried man applied through the Central Adoption Resource Authority (CARA) to adopt a 5-year-old girl child.",
    "q": "Can a single male adopt a female child under Section 57 of the Juvenile Justice (Care and Protection of Children) Act, 2015?",
    "o": [
      {
        "t": "No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender.",
        "ok": true,
        "f": "Sound legal resolution. No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender."
      },
      {
        "t": "Yes. Any adult citizen can adopt a child of any gender without restriction.",
        "f": "Legally erroneous. Yes. Any adult citizen can adopt a child of any gender without restriction."
      },
      {
        "t": "Adoption is prohibited for all unmarried individuals in India.",
        "f": "Legally erroneous. Adoption is prohibited for all unmarried individuals in India."
      }
    ]
  },
  {
    "type": "TORTS / DEFAMATION",
    "title": "[Case 81] Public interest review of a restaurant: Defence against defamation.",
    "text": "A food critic published an honest, factual review of a restaurant documenting unhygienic kitchen conditions with dated photographs. The restaurant sued for ₹10 lakh civil defamation.",
    "q": "What defence protects the critic under the law of torts and criminal law?",
    "o": [
      {
        "t": "Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation.",
        "ok": true,
        "f": "Sound legal resolution. Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation."
      },
      {
        "t": "Defamation allows zero defences; any negative review is automatically illegal.",
        "f": "Legally erroneous. Defamation allows zero defences; any negative review is automatically illegal."
      },
      {
        "t": "Critics must obtain written permission from the restaurant owner before posting any review.",
        "f": "Legally erroneous. Critics must obtain written permission from the restaurant owner before posting any review."
      }
    ]
  },
  {
    "type": "CRIMINAL / WITNESS",
    "title": "[Case 82] Hostile witness in a criminal trial: evidentiary value of testimony.",
    "text": "A key prosecution witness in an assault case turned hostile and denied his earlier police statement.",
    "q": "Can the court rely on any part of a hostile witness’s testimony under Section 154 IEA / Section 157 BSA?",
    "o": [
      {
        "t": "Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated.",
        "ok": true,
        "f": "Sound legal resolution. Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated."
      },
      {
        "t": "No. When a witness is declared hostile, their entire testimony is erased from the record.",
        "f": "Legally erroneous. No. When a witness is declared hostile, their entire testimony is erased from the record."
      },
      {
        "t": "The witness is automatically sentenced to 10 years in prison without trial.",
        "f": "Legally erroneous. The witness is automatically sentenced to 10 years in prison without trial."
      }
    ]
  },
  {
    "type": "CRIMINAL / FORENSIC",
    "title": "[Case 83] Refusal to give voice or handwriting sample during investigation.",
    "text": "An accused in an extortion case refused to give voice and handwriting samples for forensic analysis citing Article 20(3).",
    "q": "Does taking physical/voice specimens violate the right against self-incrimination?",
    "o": [
      {
        "t": "No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself.",
        "ok": true,
        "f": "Sound legal resolution. No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself."
      },
      {
        "t": "Yes. Any physical sample taken without consent violates Article 20(3).",
        "f": "Legally erroneous. Yes. Any physical sample taken without consent violates Article 20(3)."
      },
      {
        "t": "Voice samples can only be taken if the accused is convicted first.",
        "f": "Legally erroneous. Voice samples can only be taken if the accused is convicted first."
      }
    ]
  },
  {
    "type": "CONSTITUTIONAL / ARBITRARINESS",
    "title": "[Case 84] Government awards public tender to favoured bidder without advertising.",
    "text": "A municipal corporation awarded a ₹10 crore street lighting contract to a private firm through a secret backroom memo without issuing a public notice or competitive tender.",
    "q": "Does this violate Article 14 of the Constitution?",
    "o": [
      {
        "t": "Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14.",
        "ok": true,
        "f": "Sound legal resolution. Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14."
      },
      {
        "t": "No. The government can disburse public money to any private friend without tenders.",
        "f": "Legally erroneous. No. The government can disburse public money to any private friend without tenders."
      },
      {
        "t": "Tendering is only optional for contracts under ₹100 crore.",
        "f": "Legally erroneous. Tendering is only optional for contracts under ₹100 crore."
      }
    ]
  },
  {
    "type": "CYBER / FINANCIAL FRAUD",
    "title": "[Case 85] Bank customer loses funds to unauthorized SIM-swap UPI fraud.",
    "text": "A customer noticed sudden network loss on his mobile. Within 2 hours, ₹3,00,000 was siphoned from his bank account via unauthorized UPI transactions. He reported the fraud to the bank within 24 hours.",
    "q": "What is the customer’s liability under RBI’s Zero Liability circular for unauthorized electronic banking transactions?",
    "o": [
      {
        "t": "Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days.",
        "ok": true,
        "f": "Sound legal resolution. Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days."
      },
      {
        "t": "The customer is 100% liable for all cyber attacks on their bank account.",
        "f": "Legally erroneous. The customer is 100% liable for all cyber attacks on their bank account."
      },
      {
        "t": "The bank is immune unless the cyber criminal is physically arrested.",
        "f": "Legally erroneous. The bank is immune unless the cyber criminal is physically arrested."
      }
    ]
  },
  {
    "type": "CONSUMER / FLIGHT CANCELLATION",
    "title": "[Case 86] Airline cancels domestic flight without weather or technical emergency.",
    "text": "An airline cancelled a flight 3 hours before departure for commercial reasons (low occupancy) and offered neither alternate transportation nor compensation.",
    "q": "What are the passenger rights under DGCA passenger charter regulations?",
    "o": [
      {
        "t": "Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration.",
        "ok": true,
        "f": "Sound legal resolution. Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration."
      },
      {
        "t": "Airlines have absolute right to cancel flights without any refund or compensation.",
        "f": "Legally erroneous. Airlines have absolute right to cancel flights without any refund or compensation."
      },
      {
        "t": "Passengers must pay a penalty to the airline if a flight is cancelled.",
        "f": "Legally erroneous. Passengers must pay a penalty to the airline if a flight is cancelled."
      }
    ]
  },
  {
    "type": "PROPERTY / ADVERSE POSSESSION",
    "title": "[Case 87] Claim of adverse possession over private land: Essential requirement.",
    "text": "A person occupied an empty residential plot for 14 years openly, continuously, and hostile to the real owner who took no legal steps.",
    "q": "What is the statutory limitation period to claim adverse possession against private property under Article 65 of the Limitation Act, 1963?",
    "o": [
      {
        "t": "12 years of open, continuous, and hostile possession against the true owner (30 years for government land).",
        "ok": true,
        "f": "Sound legal resolution. 12 years of open, continuous, and hostile possession against the true owner (30 years for government land)."
      },
      {
        "t": "1 year of permissive tenancy.",
        "f": "Legally erroneous. 1 year of permissive tenancy."
      },
      {
        "t": "Adverse possession requires at least 100 years in India.",
        "f": "Legally erroneous. Adverse possession requires at least 100 years in India."
      }
    ]
  },
  {
    "type": "FAMILY / ADOPTION",
    "title": "[Case 88] Single male seeking to adopt a girl child under CARA / JJ Act.",
    "text": "A 32-year-old unmarried man applied through the Central Adoption Resource Authority (CARA) to adopt a 5-year-old girl child.",
    "q": "Can a single male adopt a female child under Section 57 of the Juvenile Justice (Care and Protection of Children) Act, 2015?",
    "o": [
      {
        "t": "No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender.",
        "ok": true,
        "f": "Sound legal resolution. No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender."
      },
      {
        "t": "Yes. Any adult citizen can adopt a child of any gender without restriction.",
        "f": "Legally erroneous. Yes. Any adult citizen can adopt a child of any gender without restriction."
      },
      {
        "t": "Adoption is prohibited for all unmarried individuals in India.",
        "f": "Legally erroneous. Adoption is prohibited for all unmarried individuals in India."
      }
    ]
  },
  {
    "type": "TORTS / DEFAMATION",
    "title": "[Case 89] Public interest review of a restaurant: Defence against defamation.",
    "text": "A food critic published an honest, factual review of a restaurant documenting unhygienic kitchen conditions with dated photographs. The restaurant sued for ₹10 lakh civil defamation.",
    "q": "What defence protects the critic under the law of torts and criminal law?",
    "o": [
      {
        "t": "Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation.",
        "ok": true,
        "f": "Sound legal resolution. Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation."
      },
      {
        "t": "Defamation allows zero defences; any negative review is automatically illegal.",
        "f": "Legally erroneous. Defamation allows zero defences; any negative review is automatically illegal."
      },
      {
        "t": "Critics must obtain written permission from the restaurant owner before posting any review.",
        "f": "Legally erroneous. Critics must obtain written permission from the restaurant owner before posting any review."
      }
    ]
  },
  {
    "type": "CRIMINAL / WITNESS",
    "title": "[Case 90] Hostile witness in a criminal trial: evidentiary value of testimony.",
    "text": "A key prosecution witness in an assault case turned hostile and denied his earlier police statement.",
    "q": "Can the court rely on any part of a hostile witness’s testimony under Section 154 IEA / Section 157 BSA?",
    "o": [
      {
        "t": "Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated.",
        "ok": true,
        "f": "Sound legal resolution. Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated."
      },
      {
        "t": "No. When a witness is declared hostile, their entire testimony is erased from the record.",
        "f": "Legally erroneous. No. When a witness is declared hostile, their entire testimony is erased from the record."
      },
      {
        "t": "The witness is automatically sentenced to 10 years in prison without trial.",
        "f": "Legally erroneous. The witness is automatically sentenced to 10 years in prison without trial."
      }
    ]
  },
  {
    "type": "CRIMINAL / FORENSIC",
    "title": "[Case 91] Refusal to give voice or handwriting sample during investigation.",
    "text": "An accused in an extortion case refused to give voice and handwriting samples for forensic analysis citing Article 20(3).",
    "q": "Does taking physical/voice specimens violate the right against self-incrimination?",
    "o": [
      {
        "t": "No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself.",
        "ok": true,
        "f": "Sound legal resolution. No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself."
      },
      {
        "t": "Yes. Any physical sample taken without consent violates Article 20(3).",
        "f": "Legally erroneous. Yes. Any physical sample taken without consent violates Article 20(3)."
      },
      {
        "t": "Voice samples can only be taken if the accused is convicted first.",
        "f": "Legally erroneous. Voice samples can only be taken if the accused is convicted first."
      }
    ]
  },
  {
    "type": "CONSTITUTIONAL / ARBITRARINESS",
    "title": "[Case 92] Government awards public tender to favoured bidder without advertising.",
    "text": "A municipal corporation awarded a ₹10 crore street lighting contract to a private firm through a secret backroom memo without issuing a public notice or competitive tender.",
    "q": "Does this violate Article 14 of the Constitution?",
    "o": [
      {
        "t": "Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14.",
        "ok": true,
        "f": "Sound legal resolution. Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14."
      },
      {
        "t": "No. The government can disburse public money to any private friend without tenders.",
        "f": "Legally erroneous. No. The government can disburse public money to any private friend without tenders."
      },
      {
        "t": "Tendering is only optional for contracts under ₹100 crore.",
        "f": "Legally erroneous. Tendering is only optional for contracts under ₹100 crore."
      }
    ]
  },
  {
    "type": "CYBER / FINANCIAL FRAUD",
    "title": "[Case 93] Bank customer loses funds to unauthorized SIM-swap UPI fraud.",
    "text": "A customer noticed sudden network loss on his mobile. Within 2 hours, ₹3,00,000 was siphoned from his bank account via unauthorized UPI transactions. He reported the fraud to the bank within 24 hours.",
    "q": "What is the customer’s liability under RBI’s Zero Liability circular for unauthorized electronic banking transactions?",
    "o": [
      {
        "t": "Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days.",
        "ok": true,
        "f": "Sound legal resolution. Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days."
      },
      {
        "t": "The customer is 100% liable for all cyber attacks on their bank account.",
        "f": "Legally erroneous. The customer is 100% liable for all cyber attacks on their bank account."
      },
      {
        "t": "The bank is immune unless the cyber criminal is physically arrested.",
        "f": "Legally erroneous. The bank is immune unless the cyber criminal is physically arrested."
      }
    ]
  },
  {
    "type": "CONSUMER / FLIGHT CANCELLATION",
    "title": "[Case 94] Airline cancels domestic flight without weather or technical emergency.",
    "text": "An airline cancelled a flight 3 hours before departure for commercial reasons (low occupancy) and offered neither alternate transportation nor compensation.",
    "q": "What are the passenger rights under DGCA passenger charter regulations?",
    "o": [
      {
        "t": "Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration.",
        "ok": true,
        "f": "Sound legal resolution. Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration."
      },
      {
        "t": "Airlines have absolute right to cancel flights without any refund or compensation.",
        "f": "Legally erroneous. Airlines have absolute right to cancel flights without any refund or compensation."
      },
      {
        "t": "Passengers must pay a penalty to the airline if a flight is cancelled.",
        "f": "Legally erroneous. Passengers must pay a penalty to the airline if a flight is cancelled."
      }
    ]
  },
  {
    "type": "PROPERTY / ADVERSE POSSESSION",
    "title": "[Case 95] Claim of adverse possession over private land: Essential requirement.",
    "text": "A person occupied an empty residential plot for 14 years openly, continuously, and hostile to the real owner who took no legal steps.",
    "q": "What is the statutory limitation period to claim adverse possession against private property under Article 65 of the Limitation Act, 1963?",
    "o": [
      {
        "t": "12 years of open, continuous, and hostile possession against the true owner (30 years for government land).",
        "ok": true,
        "f": "Sound legal resolution. 12 years of open, continuous, and hostile possession against the true owner (30 years for government land)."
      },
      {
        "t": "1 year of permissive tenancy.",
        "f": "Legally erroneous. 1 year of permissive tenancy."
      },
      {
        "t": "Adverse possession requires at least 100 years in India.",
        "f": "Legally erroneous. Adverse possession requires at least 100 years in India."
      }
    ]
  },
  {
    "type": "FAMILY / ADOPTION",
    "title": "[Case 96] Single male seeking to adopt a girl child under CARA / JJ Act.",
    "text": "A 32-year-old unmarried man applied through the Central Adoption Resource Authority (CARA) to adopt a 5-year-old girl child.",
    "q": "Can a single male adopt a female child under Section 57 of the Juvenile Justice (Care and Protection of Children) Act, 2015?",
    "o": [
      {
        "t": "No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender.",
        "ok": true,
        "f": "Sound legal resolution. No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender."
      },
      {
        "t": "Yes. Any adult citizen can adopt a child of any gender without restriction.",
        "f": "Legally erroneous. Yes. Any adult citizen can adopt a child of any gender without restriction."
      },
      {
        "t": "Adoption is prohibited for all unmarried individuals in India.",
        "f": "Legally erroneous. Adoption is prohibited for all unmarried individuals in India."
      }
    ]
  },
  {
    "type": "TORTS / DEFAMATION",
    "title": "[Case 97] Public interest review of a restaurant: Defence against defamation.",
    "text": "A food critic published an honest, factual review of a restaurant documenting unhygienic kitchen conditions with dated photographs. The restaurant sued for ₹10 lakh civil defamation.",
    "q": "What defence protects the critic under the law of torts and criminal law?",
    "o": [
      {
        "t": "Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation.",
        "ok": true,
        "f": "Sound legal resolution. Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation."
      },
      {
        "t": "Defamation allows zero defences; any negative review is automatically illegal.",
        "f": "Legally erroneous. Defamation allows zero defences; any negative review is automatically illegal."
      },
      {
        "t": "Critics must obtain written permission from the restaurant owner before posting any review.",
        "f": "Legally erroneous. Critics must obtain written permission from the restaurant owner before posting any review."
      }
    ]
  },
  {
    "type": "CRIMINAL / WITNESS",
    "title": "[Case 98] Hostile witness in a criminal trial: evidentiary value of testimony.",
    "text": "A key prosecution witness in an assault case turned hostile and denied his earlier police statement.",
    "q": "Can the court rely on any part of a hostile witness’s testimony under Section 154 IEA / Section 157 BSA?",
    "o": [
      {
        "t": "Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated.",
        "ok": true,
        "f": "Sound legal resolution. Yes. The testimony of a hostile witness is not wiped out completely; parts supporting either prosecution or defence can be relied upon if corroborated."
      },
      {
        "t": "No. When a witness is declared hostile, their entire testimony is erased from the record.",
        "f": "Legally erroneous. No. When a witness is declared hostile, their entire testimony is erased from the record."
      },
      {
        "t": "The witness is automatically sentenced to 10 years in prison without trial.",
        "f": "Legally erroneous. The witness is automatically sentenced to 10 years in prison without trial."
      }
    ]
  },
  {
    "type": "CRIMINAL / FORENSIC",
    "title": "[Case 99] Refusal to give voice or handwriting sample during investigation.",
    "text": "An accused in an extortion case refused to give voice and handwriting samples for forensic analysis citing Article 20(3).",
    "q": "Does taking physical/voice specimens violate the right against self-incrimination?",
    "o": [
      {
        "t": "No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself.",
        "ok": true,
        "f": "Sound legal resolution. No. A Constitution Bench in State of Bombay v. Kathi Kalu Oghad and Selvi v. State of Karnataka affirmed that giving physical measurements, handwriting, and voice exemplars does not amount to being a witness against oneself."
      },
      {
        "t": "Yes. Any physical sample taken without consent violates Article 20(3).",
        "f": "Legally erroneous. Yes. Any physical sample taken without consent violates Article 20(3)."
      },
      {
        "t": "Voice samples can only be taken if the accused is convicted first.",
        "f": "Legally erroneous. Voice samples can only be taken if the accused is convicted first."
      }
    ]
  },
  {
    "type": "CONSTITUTIONAL / ARBITRARINESS",
    "title": "[Case 100] Government awards public tender to favoured bidder without advertising.",
    "text": "A municipal corporation awarded a ₹10 crore street lighting contract to a private firm through a secret backroom memo without issuing a public notice or competitive tender.",
    "q": "Does this violate Article 14 of the Constitution?",
    "o": [
      {
        "t": "Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14.",
        "ok": true,
        "f": "Sound legal resolution. Yes. In Ramana Dayaram Shetty and Kasturi Lal, the Supreme Court held that distribution of state largesse must be fair, transparent, and non-arbitrary; awarding public tenders without transparent bidding violates Article 14."
      },
      {
        "t": "No. The government can disburse public money to any private friend without tenders.",
        "f": "Legally erroneous. No. The government can disburse public money to any private friend without tenders."
      },
      {
        "t": "Tendering is only optional for contracts under ₹100 crore.",
        "f": "Legally erroneous. Tendering is only optional for contracts under ₹100 crore."
      }
    ]
  },
  {
    "type": "CYBER / FINANCIAL FRAUD",
    "title": "[Case 101] Bank customer loses funds to unauthorized SIM-swap UPI fraud.",
    "text": "A customer noticed sudden network loss on his mobile. Within 2 hours, ₹3,00,000 was siphoned from his bank account via unauthorized UPI transactions. He reported the fraud to the bank within 24 hours.",
    "q": "What is the customer’s liability under RBI’s Zero Liability circular for unauthorized electronic banking transactions?",
    "o": [
      {
        "t": "Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days.",
        "ok": true,
        "f": "Sound legal resolution. Zero liability. If the customer reports third-party fraud to the bank within 3 working days, the customer has zero liability and the bank must credit the disputed amount within 10 working days."
      },
      {
        "t": "The customer is 100% liable for all cyber attacks on their bank account.",
        "f": "Legally erroneous. The customer is 100% liable for all cyber attacks on their bank account."
      },
      {
        "t": "The bank is immune unless the cyber criminal is physically arrested.",
        "f": "Legally erroneous. The bank is immune unless the cyber criminal is physically arrested."
      }
    ]
  },
  {
    "type": "CONSUMER / FLIGHT CANCELLATION",
    "title": "[Case 102] Airline cancels domestic flight without weather or technical emergency.",
    "text": "An airline cancelled a flight 3 hours before departure for commercial reasons (low occupancy) and offered neither alternate transportation nor compensation.",
    "q": "What are the passenger rights under DGCA passenger charter regulations?",
    "o": [
      {
        "t": "Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration.",
        "ok": true,
        "f": "Sound legal resolution. Passengers are entitled to full refund or alternate flight, plus statutory compensation ranging from ₹5,000 to ₹10,000 depending on flight duration."
      },
      {
        "t": "Airlines have absolute right to cancel flights without any refund or compensation.",
        "f": "Legally erroneous. Airlines have absolute right to cancel flights without any refund or compensation."
      },
      {
        "t": "Passengers must pay a penalty to the airline if a flight is cancelled.",
        "f": "Legally erroneous. Passengers must pay a penalty to the airline if a flight is cancelled."
      }
    ]
  },
  {
    "type": "PROPERTY / ADVERSE POSSESSION",
    "title": "[Case 103] Claim of adverse possession over private land: Essential requirement.",
    "text": "A person occupied an empty residential plot for 14 years openly, continuously, and hostile to the real owner who took no legal steps.",
    "q": "What is the statutory limitation period to claim adverse possession against private property under Article 65 of the Limitation Act, 1963?",
    "o": [
      {
        "t": "12 years of open, continuous, and hostile possession against the true owner (30 years for government land).",
        "ok": true,
        "f": "Sound legal resolution. 12 years of open, continuous, and hostile possession against the true owner (30 years for government land)."
      },
      {
        "t": "1 year of permissive tenancy.",
        "f": "Legally erroneous. 1 year of permissive tenancy."
      },
      {
        "t": "Adverse possession requires at least 100 years in India.",
        "f": "Legally erroneous. Adverse possession requires at least 100 years in India."
      }
    ]
  },
  {
    "type": "FAMILY / ADOPTION",
    "title": "[Case 104] Single male seeking to adopt a girl child under CARA / JJ Act.",
    "text": "A 32-year-old unmarried man applied through the Central Adoption Resource Authority (CARA) to adopt a 5-year-old girl child.",
    "q": "Can a single male adopt a female child under Section 57 of the Juvenile Justice (Care and Protection of Children) Act, 2015?",
    "o": [
      {
        "t": "No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender.",
        "ok": true,
        "f": "Sound legal resolution. No. Under Section 57(4) of the JJ Act, a single male is legally ineligible to adopt a girl child; however, a single female can adopt a child of any gender."
      },
      {
        "t": "Yes. Any adult citizen can adopt a child of any gender without restriction.",
        "f": "Legally erroneous. Yes. Any adult citizen can adopt a child of any gender without restriction."
      },
      {
        "t": "Adoption is prohibited for all unmarried individuals in India.",
        "f": "Legally erroneous. Adoption is prohibited for all unmarried individuals in India."
      }
    ]
  },
  {
    "type": "TORTS / DEFAMATION",
    "title": "[Case 105] Public interest review of a restaurant: Defence against defamation.",
    "text": "A food critic published an honest, factual review of a restaurant documenting unhygienic kitchen conditions with dated photographs. The restaurant sued for ₹10 lakh civil defamation.",
    "q": "What defence protects the critic under the law of torts and criminal law?",
    "o": [
      {
        "t": "Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation.",
        "ok": true,
        "f": "Sound legal resolution. Truth published for public good and fair comment on a matter of public interest, which is an absolute exception to defamation."
      },
      {
        "t": "Defamation allows zero defences; any negative review is automatically illegal.",
        "f": "Legally erroneous. Defamation allows zero defences; any negative review is automatically illegal."
      },
      {
        "t": "Critics must obtain written permission from the restaurant owner before posting any review.",
        "f": "Legally erroneous. Critics must obtain written permission from the restaurant owner before posting any review."
      }
    ]
  }
];
