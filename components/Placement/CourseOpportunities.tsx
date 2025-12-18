import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../../data/courses';

export const CourseOpportunities: React.FC = () => {
    return (
        <section className="py-20 bg-slate-950">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-12">
                    <span className="text-primary-500 font-bold tracking-widest uppercase text-xs">CAREER PATHS</span>
                    <h2 className="text-3xl font-bold text-white mt-2">Where Our Students <span className="text-primary-400">Work</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8 flex flex-col h-full hover:bg-slate-900 transition-colors group">
                            <div className="mb-6 pb-6 border-b border-slate-800">
                                <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
                                <p className="text-slate-500 text-sm">{course.careerPaths.length} Career Roles</p>
                            </div>
                            
                            <ul className="space-y-4 mb-8 flex-1">
                                {course.careerPaths.map((role, rIdx) => (
                                    <li key={rIdx} className="flex items-center gap-3 text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                                        {role}
                                    </li>
                                ))}
                            </ul>

                            <Link 
                                to={`/courses/${course.id}`}
                                className="mt-auto w-full py-3 rounded-xl border border-slate-700 text-white font-bold text-center hover:bg-white hover:text-slate-950 transition-colors"
                            >
                                View Curriculum
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
