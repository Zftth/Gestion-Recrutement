// src/pages/Contact.jsx
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique pour envoyer le message
    console.log("Données du formulaire:", formData);
    alert("Votre message a été envoyé avec succès!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar (identique à la page d'accueil) */}
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-10" />
            <span className="text-xl font-bold text-blue-700">RecrutPro</span>
          </div>
          <ul className="hidden md:flex space-x-8 font-medium">
            <li><a href="/" className="hover:text-blue-600">Accueil</a></li>
            <li><a href="/about" className="hover:text-blue-600">À propos</a></li>
            <li><a href="/blog" className="hover:text-blue-600">Blogs</a></li>
            <li><a href="/contact" className="text-blue-600">Contact</a></li>
          </ul>
          <div className="flex space-x-3">
            <a href="/login" className="px-4 py-2 border rounded-md text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
              Se connecter
            </a>
            <a href="/register" className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">
              Registre
            </a>
          </div>
        </div>
      </nav>

      {/* Section principale de contact */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Colonne de gauche - Informations de contact */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Entrer en contact</h1>
            <p className="text-lg text-gray-600 mb-8">
              Nous sommes toujours à la recherche de nouveaux clients. Si vous souhaitez collaborer avec nous, n'hésitez pas à nous contacter de l'une des manières suivantes.
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Adresse</h2>
              <p className="text-gray-600">8014 Boulevard Edith NE, Avedji, Lomé, Togo</p>
            </div>

            <div className="w-full h-px bg-gray-300 my-8"></div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Téléphone</h3>
              <p className="text-blue-600 font-medium">+228 70 26 51 34</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">E-mail</h3>
              <p className="text-blue-600 font-medium">awidelphine6@gmail.com</p>
            </div>

            <div className="w-full h-px bg-gray-300 my-8"></div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Horaires d'ouverture</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-900">Lun - Ven</p>
                  <p className="text-gray-600">9h - 17h</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sam - Dim</p>
                  <p className="text-gray-600">9h - 14h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne de droite - Formulaire de contact */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Envoyer Un Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom et prénom *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Sujet *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div className="w-full h-px bg-gray-300 my-6"></div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-3 px-6 rounded-md hover:bg-blue-800 transition-colors font-medium"
              >
                Envoyer Un Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer (identique à la page d'accueil) */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">À PROPOS DE NOUS</h3>
              <p className="mb-4">RecrutPro est la plateforme de recrutement leader au Togo, connectant les talents aux meilleures opportunités professionnelles.</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">COORDONNÉES</h3>
              <address className="not-italic">
                <p className="mb-2">8014 Boulevard Edith NE, Avedji</p>
                <p className="mb-2">Lomé, Togo</p>
                <p className="mb-2">awidelphine6@gmail.com</p>
                <p>+228 70 26 51 34</p>
              </address>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">LIEN IMPORTANT</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">BULLETIN</h3>
              <p className="mb-4">Abonnez-vous à notre newsletter pour recevoir les dernières offres d'emploi.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="px-4 py-2 rounded-l-md w-full text-gray-900"
                />
                <button className="bg-blue-700 text-white px-4 py-2 rounded-r-md hover:bg-blue-800">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center">
            <p>© {new Date().getFullYear()} RecrutPro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}