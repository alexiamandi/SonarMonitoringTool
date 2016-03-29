package alex.iamandi.SonarMonitoringTool;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Home {
	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private InstanceRepository instanceRepository;

	@Autowired
	private GetInfo getInfo;
	
	@RequestMapping(value = "/projects")
	public List<Project> showProjects(Model model) {
		ArrayList<Project> listOfProjects = (ArrayList<Project>) projectRepository.findAll();
		System.out.println("---"+listOfProjects.size()+" projects---");
		return listOfProjects;
	}

	@RequestMapping(path = "/project/{projectId}", method = RequestMethod.GET)
	public Project getProject(@PathVariable String projectId, Model model) {
		Project project = projectRepository.findById(Long.parseLong(projectId));
		return project;
	}

	@RequestMapping(path = "/newURL/{URL}/{s}", method = RequestMethod.GET)
	public void getInfo(@PathVariable String URL, @PathVariable Boolean s, Model model) {
		String givenURL;
		if (s) {
			givenURL = "https://"+URL+"/";
		}
		else{
			givenURL = "http://"+URL+"/";
		}

		Instance findInstance = instanceRepository.findByLink(givenURL);
		if (findInstance != null) {
			System.out.println("Given URL already exists in the database.");
		} else {
			Instance newInstance = new Instance(givenURL);
			instanceRepository.save(newInstance);
			getInfo.listOfProjects(newInstance);
		}
	}
}
