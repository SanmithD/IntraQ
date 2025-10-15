"use client"

import { UseQuestionStore } from "@/app/store/UseQuestionStore"
import { QuestionDetails } from "@/types/QuestionTypes"
import { Briefcase, Building2, Code2, FileText, MessageSquare, Minus, Plus, Send, X } from "lucide-react"
import { useEffect, useState } from "react"

interface EditQuestionProps {
  post: QuestionDetails
  onClose: () => void
  onUpdate: () => void
}

function EditQuestion({ post, onClose, onUpdate }: EditQuestionProps) {
  const isQuestionLoading = UseQuestionStore((state) => state.isQuestionLoading)
  const updateQuestion = UseQuestionStore((state) => state.updateQuestion)

  const [formData, setFormData] = useState({
    question: "",
    language: "",
    solution: "",
    company: "",
    role: "",
  })
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    if (post) {
      setFormData({
        question: post.question || "",
        language: post.language || "",
        solution: post.solution || "",
        company: post.company || "",
        role: post.role || "",
      })
      setShowSolution(!!post.solution)
    }
  }, [post])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.question || !formData.language) {
      alert("Question and language are required")
      return
    }
    
    try {
      await updateQuestion(post._id as string, formData)
      onUpdate() 
      onClose()
    } catch (error) {
      console.error("Error updating question:", error)
    }
  }

  const toggleSolution = () => {
    setShowSolution(!showSolution)
    if (showSolution) {
      setFormData({ ...formData, solution: "" })
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Edit Question
                </h1>
                <p className="text-slate-600">Update your coding question and solution</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 hover:bg-slate-100 rounded-xl flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-2 h-6 bg-gradient-to-b from-primary to-primary/70 rounded-full"></div>
                  <h2 className="text-xl font-bold text-slate-800">Question Details</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="block">
                        <span className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Building2 className="w-3 h-3 text-primary" />
                          </div>
                          Company
                        </span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-slate-800 border border-slate-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder-slate-400"
                        placeholder="Where was this question asked?"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block">
                        <span className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-3 h-3 text-primary" />
                          </div>
                          Role
                        </span>
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-slate-800 border border-slate-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder-slate-400"
                        placeholder="Target job position"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Code2 className="w-3 h-3 text-primary" />
                        </div>
                        Language *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-slate-800 border border-slate-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder-slate-400"
                      placeholder="JavaScript, Python, Java..."
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-3 h-3 text-primary" />
                        </div>
                        Problem Statement *
                      </span>
                    </label>
                    <textarea
                      name="question"
                      value={formData.question}
                      onChange={handleChange}
                      className="w-full min-h-[120px] px-3 py-3 text-slate-800 border border-slate-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none placeholder-slate-400"
                      placeholder="Describe the coding problem, requirements, and any constraints..."
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-800 mb-2 block">
                        Solution
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={toggleSolution}
                      className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                        showSolution 
                          ? "border-primary bg-primary/5 text-primary" 
                          : "border-slate-300 hover:border-slate-400 text-slate-700"
                      }`}
                    >
                      {showSolution ? (
                        <>
                          <Minus className="w-4 h-4" />
                          <span className="font-semibold">Remove Solution</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span className="font-semibold">Add Solution</span>
                        </>
                      )}
                    </button>
                  </div>

                  {showSolution && (
                    <div className="space-y-3 animate-fadeIn">
                      <label className="block">
                        <span className="text-sm font-semibold text-slate-800 mb-2 block">
                          Your Solution
                        </span>
                      </label>
                      <textarea
                        name="solution"
                        value={formData.solution}
                        onChange={handleChange}
                        className="w-full min-h-[100px] px-3 py-3 border text-black border-slate-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none placeholder-slate-400 font-mono text-sm"
                        placeholder="Paste your solution code or write a detailed explanation..."
                      />
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isQuestionLoading}
                      className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isQuestionLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Update Question</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditQuestion