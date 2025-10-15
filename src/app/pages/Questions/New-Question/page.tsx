"use client"

import { UseQuestionStore } from "@/app/store/UseQuestionStore"
import { Briefcase, Building2, Code2, FileText, MessageSquare, Minus, Plus, Send } from "lucide-react"
import { useState } from "react"

function NewQuestion() {
  const isQuestionLoading = UseQuestionStore((state) => state.isQuestionLoading)
  const postQuestion = UseQuestionStore((state) => state.postQuestion)

  const [formData, setFormData] = useState({
    question: "",
    language: "",
    solution: "",
    company: "",
    role: "",
  })
  const [showSolution, setShowSolution] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.question || !formData.language) {
      alert("Question and language are required")
      return
    }
    await postQuestion(formData)
    setFormData({ question: "", language: "", solution: "", company: "", role: "" })
    setShowSolution(false)
  }

  const toggleSolution = () => {
    setShowSolution(!showSolution)
    if (showSolution) {
      setFormData({ ...formData, solution: "" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg mb-6">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Submit Coding Question
          </h1>
          <p className="text-lg text-slate-800 max-w-2xl mx-auto leading-relaxed">
            Share your programming challenges with the developer community. Get insights and solutions from fellow engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-gray-400 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/70 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-slate-800">Question Details</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block">
                        <span className="text-lg font-semibold text-slate-800 flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-primary" />
                          </div>
                          Company
                        </span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-black border border-slate-300 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 placeholder-slate-700"
                        placeholder="Where was this question asked?"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block">
                        <span className="text-lg font-semibold text-slate-800 flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-primary" />
                          </div>
                          Role
                        </span>
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-black border border-slate-300 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 placeholder-slate-700"
                        placeholder="Target job position"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                      <label className="block">
                        <span className="text-lg font-semibold text-slate-800 flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Code2 className="w-4 h-4 text-primary" />
                          </div>
                          Language *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-black border border-slate-300 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 placeholder-slate-700"
                        placeholder="JavaScript, Python, Java..."
                        required
                      />
                    </div>

                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-lg font-semibold text-slate-800 flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        Problem Statement *
                      </span>
                    </label>
                    <textarea
                      name="question"
                      value={formData.question}
                      onChange={handleChange}
                      className="w-full min-h-[140px] px-4 py-4 text-black border border-slate-300 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 resize-none placeholder-slate-700"
                      placeholder="Describe the coding problem, requirements, and any constraints..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block">
                        <span className="text-lg font-semibold text-slate-800 mb-3 block">
                          Include Solution
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={toggleSolution}
                        className={`w-full px-4 py-3 text-black border-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 ${
                          showSolution 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-slate-300 hover:border-slate-700 text-slate-700"
                        }`}
                      >
                        {showSolution ? (
                          <>
                            <Minus className="w-5 h-5" />
                            <span className="font-semibold">Remove Solution</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-5 h-5" />
                            <span className="font-semibold">Add Solution</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {showSolution && (
                    <div className="space-y-3 animate-fadeIn">
                      <label className="block">
                        <span className="text-lg font-semibold text-slate-800 mb-3 block">
                          Your Solution
                        </span>
                      </label>
                      <textarea
                        name="solution"
                        value={formData.solution}
                        onChange={handleChange}
                        className="w-full min-h-[120px] px-4 py-4 border text-black border-slate-300 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 resize-none placeholder-slate-700 font-mono text-sm"
                        placeholder="Paste your solution code or write a detailed explanation..."
                      />
                    </div>
                  )}

                  
                  <div className="pt-6 border-t border-slate-100">
                    <button
                      type="submit"
                      disabled={isQuestionLoading}
                      className="w-full bg-gradient-to-r cursor-pointer from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-3"
                    >
                      {isQuestionLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Question...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Publish Question</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-slate-500 text-sm mt-4">
                      All fields marked with * are required. Your question will be visible to the community.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sticky top-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-primary rounded-full"></div>
                Submission Guidelines
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Be Specific</h4>
                    <p className="text-slate-600 text-sm mt-1">Include input/output examples and constraints</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Clear Language</h4>
                    <p className="text-slate-600 text-sm mt-1">Specify the programming language and version</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Solution Optional</h4>
                    <p className="text-slate-600 text-sm mt-1">Add your solution if you have one, or let others help</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Context Matters</h4>
                    <p className="text-slate-600 text-sm mt-1">Include company and role for interview questions</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-2">💡 Pro Tip</h4>
                <p className="text-slate-600 text-sm">
                  Well-structured questions with examples receive faster and more accurate responses from the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewQuestion